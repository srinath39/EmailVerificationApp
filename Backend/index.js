const express = require('express');
const app = express();
const dotenv = require("dotenv");
const emailVerificationRoute = require("./Routes/emailVerificationRoute");
const cors = require("cors");
const { DBConnection } = require("./Database/DBConnection");
dotenv.config();

app.listen(process.env.PORT, () => {
        console.log(`Server running on port number ${process.env.PORT}`);
});

DBConnection();

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
  }));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", emailVerificationRoute);
