"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var dotenv = require("dotenv");
dotenv.config();
var mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_DIRECTION,
        pass: process.env.EMAIL_PASSWORD,
    },
});
mailer.verify().then(function () { return console.log("ready"); });
exports.default = mailer;
