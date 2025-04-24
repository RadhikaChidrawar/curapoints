import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
import { sendEmail } from "../utils/emailUtils.js";
import sendWhatsAppMessage from "../utils/whatsappUtils.js";
import mongoose from "mongoose";

// API to register user
// API to register user
const registerUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const {
      name,
      phone = " ",
      email,
      password,
      twilioSid,
      twilioToken,
      twilioNumber,
      userEmail,
      userPass,
    } = req.body;
    console.log("Extracted Data:", { name, phone, email, password });

    // Validate required fields
    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid Email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Generate OTP Random 6 Digit
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      phone,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // Send email
    try {
      const subject = "Welcome to CuraPoint!";
      const message = `Hello ${name},\n\nYour registration is successful. Your OTP is: ${otp}\n\nThank you for joining CuraPoint!`;

      await sendEmail(email, name, otp, subject, message, userEmail, userPass);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    // Send WhatsApp message
    try {
      await sendWhatsAppMessage(
        phone,
        "Welcome to CuraPoint!",
        twilioSid,
        twilioToken,
        twilioNumber
      );
    } catch (whatsappError) {
      console.error("WhatsApp message failed:", whatsappError);
    }

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get update user profile data
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.json({ success: false, message: "Invalid User ID" });
    }

    await userModel.findOneAndUpdate(
      { _id: userId }, // Wrap userId in an object
      { name, phone, address: JSON.parse(address), dob, gender },
      { new: true } // Return updated document
    );

    if (imageFile) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(
        userId,
        { image: imageURL },
        { new: true }
      );
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked;

    // Ensure slotDate exists in slots_booked before accessing or modifying it
    if (!slots_booked) {
      slots_booked = {}; // Initialize if slots_booked is undefined
    }

    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // Initialize the slot for this specific date
    }

    // Checking for slot availability
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    } else {
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointmets = await appointmentModel.find({ userId });

    res.json({ success: true, appointmets });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    console.log("Received request to cancel:", req.body);
    const { userId, appointmentId } = req.body;

    if (!userId || !appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or appointmentId" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const doctorData = await doctorModel.findById(appointmentData.docId);

    if (!doctorData) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not found" });
    }

    if (!doctorData.slots_booked) {
      doctorData.slots_booked = {};
    }

    if (!doctorData.slots_booked[appointmentData.slotDate]) {
      return res.status(400).json({
        success: false,
        message: `No bookings found for date ${appointmentData.slotDate}`,
      });
    }

    doctorData.slots_booked[appointmentData.slotDate] = doctorData.slots_booked[
      appointmentData.slotDate
    ].filter((e) => e !== appointmentData.slotTime);

    await doctorModel.findByIdAndUpdate(appointmentData.docId, {
      slots_booked: doctorData.slots_booked,
    });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// API to make payment of appointment using Razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Validate input
    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required" });
    }

    // Fetch appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or has been cancelled",
      });
    }

    // Create Razorpay order options
    const options = {
      amount: appointmentData.amount * 100, // Razorpay amount is in paise (smallest currency unit)
      currency: process.env.CURRENCY || "INR", // Default to INR if CURRENCY is not set
      receipt: appointmentId,
    };

    // Create an order using Razorpay instance
    const order = await razorpayInstance.orders.create(options);

    // Send successful response with order details
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error during payment process:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Success" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error("Error during payment process:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
