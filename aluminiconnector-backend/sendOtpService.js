require('dotenv').config();

const nodemailer = require('nodemailer')

const { 
    emailServiceUser, 
    emailServicePass,
    emailServiceHost,
    emailServicePort
} = require('./config/env')

const sendOtp = (otp , email)=>{
    const transport = nodemailer.createTransport(
        {
           host: emailServiceHost,
           port: emailServicePort,
           secure: false, // use false for STARTTLS; true for SSL on port 465
           auth: {
             user: emailServiceUser,
             pass: emailServicePass,
           }
         });
    const mailOptions = {
        from: emailServiceUser,
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


