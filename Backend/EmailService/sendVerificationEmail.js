const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendVerificationEmail = async (toEmail, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,        // its uses App password instead of Normal gmail password , that is valid unless 2-verification factor is off 
      },
    });

    const mailOptions = {
      from: `"CodeWithFun" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Email Verification Code",
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${verificationCode}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Something went wrong");
    return error;
  }
};

module.exports = {sendVerificationEmail};
