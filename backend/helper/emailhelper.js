import { StatusCodes } from "http-status-codes";
import { transport } from "../config/index.js";

import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  WELCOME_ONBOARDING_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../lib/constant/emailtemplate.js";

// Function to send a verification email
async function sendVerificationEmail(email, verificationToken) {
  const sender = "Grandlink";
  const recipient = email;

  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log(`Email sent successfully: ${response.messageId}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error.message}`);
    throw new Error("Failed to send verification email");
  }
}

// Function to send a password reset email
async function sendPasswordResetEmail(email, resetToken, clientUrl) {
  const sender = "Ecommerce-Company";
  const recipient = email;

  if (!clientUrl) {
    throw new Error("Client URL is not defined");
  }

  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipient,
      subject: "Your Password Reset Link",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        `${clientUrl}/auth/reset-password/${resetToken}`
      ),
    });
    console.log(`Email sent successfully: ${response.messageId}`);
  } catch (error) {
    console.error(`Error sending password reset email: ${error.message}`);
    throw new Error("Failed to send password reset email");
  }
}

// Function to send a welcome email
async function welcomeEmail(email, name) {
  const sender = "GradLink";
  const recipient = email;

  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipient,
      subject: "Welcome to the Ecommerce Platform",
      html: WELCOME_ONBOARDING_TEMPLATE.replace("[User's Name]", name),
    });
    console.log(`Email sent successfully: ${response.messageId}`);
  } catch (error) {
    console.error(`Error sending welcome email: ${error.message}`);
    throw new Error("Failed to send welcome email");
  }
}

// Function to send a password change success email
async function passwordSuccessEmail(email) {
  const sender = "Ecommerce-Company";
  const recipient = email;

  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipient,
      subject: "Password Successfully Changed",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log(`Email sent successfully: ${response.messageId}`);
  } catch (error) {
    console.error(`Error sending password success email: ${error.message}`);
    throw new Error("Failed to send password success email");
  }
}

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
  welcomeEmail,
  passwordSuccessEmail,
};
