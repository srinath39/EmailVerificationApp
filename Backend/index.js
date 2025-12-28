const express = require('express');
const app = express();
const {sendEmailVerificationCode}=require("./EmailService/sendEmailVerificationCode");
const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT, () => {
        console.log(`Server running on port number ${process.env.PORT}`);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user/send-verification",sendEmailVerificationCode);