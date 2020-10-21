const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [8, 'Password should be at least 8 characters long'],
        select: false
    },
    companyName: {
        type: String,
        default: null
    },
    verified: {
        // 0 -> Not verified, 1 -> verified
        type: Number,
        default: 0
    },
    verificationToken: {
        type: String,
        required: true
    },
    pwdResetToken: {
        type: String,
        default: null
    },
    // deadline time before reset link expires
    pwdResetTime: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Subscriber', SubscriberSchema);