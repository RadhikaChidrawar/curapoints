import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

//API for adding doctor
const addDoctor = async (req,res) =>{
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
        }

        //validation email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter valid email"})
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({success:false,message:"Please enter strong password:"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for admin login
const loginAdmin = async (req,res) =>{
    try {
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
        console.log("Received request:", req.body); // Debugging request data

        // Fix: Ensure the correct key is used
        const appointmentId = req.body.appointmentId || req.body.appintmentId;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        if (appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: 'Appointment is already cancelled' });
        }

        // Proceed with cancellation
        appointmentData.cancelled = true;
        await appointmentData.save();

        res.json({ success: true, message: 'Appointment cancelled successfully' });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// API to get dashboard data for admin pane
 const adminDashboard = async (req,res) => {

    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
 }

 // API to get admin earnings by doctor
const adminEarnings = async (req, res) => {
    try {
      const appointments = await appointmentModel.find({ cancelled: false }).populate("doctorId");
  
      const earningsMap = {};
  
      appointments.forEach((appt) => {
        const doctorId = appt.doctorId._id;
        const doctorName = appt.doctorId.name;
        const fee = appt.fees;
  
        if (!earningsMap[doctorId]) {
          earningsMap[doctorId] = {
            doctorName,
            totalAppointments: 0,
            totalFee: 0,
          };
        }
  
        earningsMap[doctorId].totalAppointments += 1;
        earningsMap[doctorId].totalFee += fee;
      });
  
      const result = Object.values(earningsMap).map((item) => ({
        ...item,
        adminCommission: parseFloat((item.totalFee * 0.1).toFixed(2)),
        doctorEarnings: parseFloat((item.totalFee * 0.9).toFixed(2)),
      }));
  
      res.json({ success: true, earnings: result });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
// API to delete a doctor
// const deleteDoctor = async (req, res) => {
//     try {
//         const { doctorId } = req.body;

//         if (!doctorId) {
//             return res.json({ success: false, message: "Doctor ID is required" });
//         }

//         // Check if the doctor has any upcoming appointments
//         const hasAppointments = await appointmentModel.exists({
//             doctorId: doctorId,
//             cancelled: false,
//             date: { $gte: new Date() } // Future appointments
//         });

//         if (hasAppointments) {
//             return res.json({ 
//                 success: false, 
//                 message: "Cannot delete doctor with upcoming appointments" 
//             });
//         }

//         // Delete the doctor
//         await doctorModel.findByIdAndDelete(doctorId);

//         res.json({ success: true, message: "Doctor deleted successfully" });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };
  

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, adminEarnings, deleteDoctor}
