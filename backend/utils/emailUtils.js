import nodemailer from "nodemailer";

export const sendEmail = async (email, name, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anushkapowar173@gmail.com", // Tujha Gmail
        pass: "plnm xxft jyrg dnra", // App Password
      },
    });

    const mailOptions = {
      from: "CuraPoint Team 👩‍⚕️",
      to: email,
      subject: "CuraPoint - OTP Verification",
      html: `
        <div style="text-align: center; padding: 20px; background: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #1D5B79;">Welcome ${name} 👋</h2>
          <p>Thank you for registering on <strong>CuraPoint</strong>.</p>
          <p>Your OTP Code is: <strong style="color: #1D5B79; font-size: 24px;">${otp}</strong></p>
          <p>This OTP is valid for 5 minutes only.</p>
          <br>
          <small style="color: grey;">If you didn't request this, please ignore this email.</small>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent: " + info.response);
    return true;
  } catch (error) {
    console.log("Email Error: ", error.message);
    return false;
  }
};
