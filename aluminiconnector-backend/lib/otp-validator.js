const Otp = require('../models/Otp'); // Assuming Otp schema is already created

const validateOtp = async (email, otp) => {
    console.log(otp)
    console.log(email)
  try {
    // Find the OTP associated with the email
    const otpRecord = await Otp.findOne({ otp, email });

    if (!otpRecord) {
      throw new Error('Invalid OTP or email');
    }

    // Check if OTP is expired
    const now = new Date();
    if (otpRecord.expiry < now) {
      throw new Error('OTP has expired');
    }

    // OTP is valid, proceed with further actions (e.g., registering the user)
    // Optionally delete the OTP after successful validation
    await Otp.deleteOne({ _id: otpRecord._id });

    return { status: 200, message: 'OTP is valid' };
  } catch (error) {
    console.error('Error validating OTP:', error.message);
    throw new Error('Server error during OTP validation');
  }
};

module.exports = validateOtp;
