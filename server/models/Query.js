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
        type: mongoose.Schema.ObjectId,
        ref: 'Subscriber',
    },
    subscriber: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subscriber',
        required: [true, 'A reference to this subscriber not found']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

module.exports = mongoose.model('Query', QuerySchema)