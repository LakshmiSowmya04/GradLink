export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #007BFF, #0056b3); 
      padding: 20px; 
      text-align: center;
      color: white;
    }
    .content {
      background-color: #f9f9f9; 
      padding: 20px; 
      border-radius: 0 0 5px 5px; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .verification-code {
      font-size: 32px; 
      font-weight: bold; 
      letter-spacing: 5px; 
      color: #007BFF;
    }
    .footer {
      text-align: center; 
      margin-top: 20px; 
      color: #888; 
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up with GradeLink! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span class="verification-code">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>The GradeLink Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #007BFF, #0056b3); 
      padding: 20px; 
      text-align: center;
      color: white;
    }
    .content {
      background-color: #f9f9f9; 
      padding: 20px; 
      border-radius: 0 0 5px 5px; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .success-icon {
      background-color: #007BFF; 
      color: white; 
      width: 50px; 
      height: 50px; 
      line-height: 50px; 
      border-radius: 50%; 
      display: inline-block; 
      font-size: 30px;
    }
    .footer {
      text-align: center; 
      margin-top: 20px; 
      color: #888; 
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Successful</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div class="success-icon">✓</div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>The GradeLink Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #007BFF, #0056b3); 
      padding: 20px; 
      text-align: center;
      color: white;
    }
    .content {
      background-color: #f9f9f9; 
      padding: 20px; 
      border-radius: 0 0 5px 5px; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .reset-button {
      background-color: #007BFF; 
      color: white; 
      padding: 12px 20px; 
      text-decoration: none; 
      border-radius: 5px; 
      font-weight: bold;
    }
    .footer {
      text-align: center; 
      margin-top: 20px; 
      color: #888; 
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" class="reset-button">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>The GradeLink Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_ONBOARDING_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to GradeLink</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #007BFF, #0056b3); 
      padding: 20px; 
      text-align: center;
      color: white;
    }
    .content {
      background-color: #f9f9f9; 
      padding: 20px; 
      border-radius: 0 0 5px 5px; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .footer {
      text-align: center; 
      margin-top: 20px; 
      color: #888; 
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to GradeLink</h1>
  </div>
  <div class="content">
    <p>Hello "[User's Name]",</p>
    <p>We're thrilled to have you join our community at GradeLink!</p>
    <p>Your journey begins here, and we can't wait for you to explore our platform designed to connect students and alumni.</p>
    <p>Here are a few things you can do:</p>
    <ul>
      <li>Connect with fellow alumni</li>
      <li>Access career resources</li>
      <li>Join groups and discussions</li>
      <li>Stay updated on events and news</li>
    </ul>
    <p>Feel free to reach out if you have any questions or need assistance. We're here to help!</p>
    <p>Best regards,<br>The GradeLink Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
