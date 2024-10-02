# Email Service Integration

This document provides a guide for setting up email services using a Google account through SMTP. By following these instructions, you will be able to send emails from your application securely.

## Prerequisites

- A Google account (Gmail).
- Basic understanding of Node.js and environment variables.

## Steps to Connect Your Google Account

### 1. Enable Less Secure App Access (if necessary)

**Note:** This step may be necessary if you are not using App Passwords (recommended). Google is phasing out less secure app access. Therefore, generating an App Password is the preferred method.

1. Go to your [Google Account](https://myaccount.google.com/).
2. Navigate to **Security** in the left sidebar.
3. Under the **Less secure app access** section, make sure it's turned **On** (if using regular password; if using App Passwords, skip to Step 2).

### 2. Enable Two-Factor Authentication (2FA)

To use App Passwords, you need to enable 2FA.

1. In your Google Account settings, go to **Security**.
2. Under **Signing in to Google**, click on **2-Step Verification**.
3. Follow the prompts to set up 2FA.

### 3. Generate an App Password

1. Once 2FA is enabled, go back to the **Security** section.
2. Under **Signing in to Google**, find **App passwords**.
3. You may need to sign in again.
4. Select the app (e.g., **Mail**) and device (e.g., **Other** or your application's name) you want to generate the password for.
5. Click **Generate**.
6. Copy the generated 16-character password. You will use this in your application.

### 4. Configure Your Application

1. In your project, create a `.env` file (if you don't have one already) and add the following variables:

   ```dotenv
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

   Replace `your-email@gmail.com` with your actual Google email address and `your-app-password` with the App Password generated in the previous step.

### 5. Set Up SMTP in Your Application

Ensure you have the necessary packages installed. If you're using Node.js, you can use `nodemailer`. Install it using:

```bash
npm install nodemailer
```
