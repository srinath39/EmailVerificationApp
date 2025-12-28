const {sendVerificationEmail}=require("../EmailService/sendVerificationEmail");

const sendEmailVerificationCode = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new HttpError('Please provide email for verfication code', 400));
    }
    const otp = generateOTP();
    try {
        await sendVerificationEmail(email, otp);
    } catch (error) {
        return  res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "Verification code sent" });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { sendEmailVerificationCode };