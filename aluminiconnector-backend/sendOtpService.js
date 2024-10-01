require('dotenv').config();
const nodemailer = require('nodemailer')

const sendOtp = (otp , email)=>{
    const transport = nodemailer.createTransport(
        {
           host: 'smtp.gmail.com',
           port: 587,
           secure: false, // use false for STARTTLS; true for SSL on port 465
           auth: {
             user: process.env.EMAIL_SERVICE_USER,
             pass: process.env.EMAIL_SERVICE_PASS,
           }
         });
    const mailOptions = {
        from: process.env.EMAIL_SERVICE_USER,
        to: email,
        subject: 'Email Verification Otp from GradLink',
        text: `Your OTP is ${otp}`
    }
    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })

}

// sendOtp(1234, '');

module.exports = sendOtp


