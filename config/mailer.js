const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_DIRECTION,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify().then(() => console.log("ready"));

module.exports = transporter;
