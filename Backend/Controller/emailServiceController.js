const { sendVerificationEmail } = require("../Utils/EmailService/sendVerificationEmail");
const OtpModel = require("../Models/otpSchema");

const sendEmailVerificationCodeController = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new HttpError('Please provide email for verfication code', 400));
    }
    const otp = generateOTP();
    await OtpModel.deleteMany({ email });

    await OtpModel.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });


    try {
        await sendVerificationEmail(email, otp);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "Verification code sent to your Email" });
};


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const veriftOtpController = async (req, res, error) => {
    try {
        const { email, otp } = req.body;

        const record = await OtpModel.findOne({ email, otp });

        if (!record) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (record.expiresAt < new Date()) {
            await OtpModel.deleteOne({ _id: record._id });
            return res.status(400).json({ message: "OTP expired" });
        }

        // OTP is valid
        await OtpModel.deleteOne({ _id: record._id });

        res.status(200).json({
            message: "OTP verified successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Verification failed" });
    }
};

module.exports = { sendEmailVerificationCodeController, veriftOtpController};