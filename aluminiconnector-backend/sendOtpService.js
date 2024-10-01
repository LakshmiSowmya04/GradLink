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
        subject: 'Verify Your Email for GradLink',
        text: 'Your OTP for verifying your email on GradLink is 123456. Please enter this code to complete your verification.',
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 10px 0;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: blue;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>GradLink</h1>
                    </div>
                    <div class="content">
                        <p>Dear GradLink User,</p>
                        <p>Thank you for joining GradLink, the platform where college alumni connect and grow together.</p>
                        <p>Your One-Time Password (OTP) for email verification is:</p>
                        <p class="otp">${otp}</p>
                        <p>Please enter this code on the verification page to complete your registration.</p>
                        <p>If you did not request this, please ignore this email.</p>
                        <p>Best regards,<br/>The GradLink Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 GradLink. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        
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


