const nodemailer = require('nodemailer');
const config = require("../config/config.js");
// Configure Nodemailer
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass,
  },
});
 
// Send Password Reset Email
const sendPasswordResetEmail = async (admin) => {
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates random 6-digit number
    admin.otp = otp;
    admin.otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
    await admin.save(); // Save OTP and expiration to the admin document
 
    const mailOptions = {
      from: `"Sparsh Skin Clinic" <${config.user}>`,
      to: admin.email,
      subject: 'Password Reset Request',
      html: `
       <div style="text-align: center;">
      <img src="https://sparshskinclinic.com/assets/logo.png" alt="Sparsh Skin Clinic" width="400"/>
        <p>Hello ${admin.firstName},</p>
        <p>Your OTP for password reset is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
      `,
    };

    // Send the email
    await transport.sendMail(mailOptions);
    
    return { 
      success: true, 
      message: 'Password reset OTP has been sent to your email.' 
    };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { 
      success: false, 
      message: 'Failed to send password reset email. Please try again later.' 
    };
  }
};

module.exports = sendPasswordResetEmail;