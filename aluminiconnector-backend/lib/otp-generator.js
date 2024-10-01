/**
 * Generate OTP as per the given length and type
 * @param {number} length - Length of the OTP
 * @param {string} type - Type of the OTP (numeric, alphanumeric, alphabetic)
 * @returns {string} - Generated OTP
 */

const DEFINED_TYPES = ['numeric', 'alphanumeric', 'alphabetic'];

function generateOtp (length = 6, type = 'numeric') {
    // check if the type is defined or not
    if (!DEFINED_TYPES.includes(type)) {
        throw new Error(`Invalid otp type: ${type}`);
    }

    let characters = '';
    if (type === 'numeric') {
        characters = '0123456789';
    } else if (type === 'alphanumeric') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    } else if (type === 'alphabetic') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }

    let OTP = '', count = 0;
    while (count < length) {
        OTP += characters[Math.floor(Math.random() * characters.length)];
        count++;
    }

    return OTP;
}

/*
|--------------------------------------------------------------------------
| Sample Usage
| ============
| const generateOtp = require('./lib/otp-generator');
| console.log(generateOtp()); // Output: 123456 (default length is 6 & type is numeric)
| console.log(generateOtp(8, 'alphanumeric')); // Output: 1a2B3c4D
| console.log(generateOtp(5, 'alphabetic')); // Output: 3b5Ac
|--------------------------------------------------------------------------
*/

module.exports = generateOtp;