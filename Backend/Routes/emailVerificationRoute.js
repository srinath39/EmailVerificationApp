const express = require("express");
const router = express.Router();
const { sendEmailVerificationCodeController, veriftOtpController } = require("../Controller/emailServiceController");

router.post("/send-verification", sendEmailVerificationCodeController);

router.post("/verify-otp", veriftOtpController);



module.exports = router;