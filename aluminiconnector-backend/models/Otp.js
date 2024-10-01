const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    action: {
        type: String,
        required: true,
        enum: [
            'register', 
            'login', 
            'reset-password', 
            'change-email', 
            'change-password',
            'verify-email',
            'verify-phone',
            // Add more actions here or edit them as needed
        ]
    },
    email: { 
        type: String, 
        required: true, 
        index: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false, // optional field
        index: true,
    },
    expiry: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 } // TTL Index
    }
});

// Combination of action and otp code should be unique
OtpSchema.index({ action: 1, otp: 1 }, { unique: true });

module.exports = mongoose.model('Otp', OtpSchema);