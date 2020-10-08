const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        // reconsider the 'required'
        required: [true, 'Please add a title']
    },
    query_data: {
        type: [
            [Object]
        ],
        required: true
    },
    avatar: {
        type: String,
        enum: ['untitled.png', 'untitled2.png', 'untitled3.png', 'untitled4.png', 'untitled5.png', 'untitled6.png', 'none'],
        default: 'none'
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    subscriber: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subscriber',
        required: [true, 'A reference to this subscriber not found']
    },
    status: {
        // 0 -> closed, 1 -> active
        type: Number,
        default: 1,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

module.exports = mongoose.model('Query', QuerySchema)