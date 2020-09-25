const mongoose = require('mongoose');

const ResponseSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    response_data: {
        type: [
            [Object]
        ],
        required: true
    },
    query: {
        type: mongoose.Schema.ObjectId,
        ref: 'Query',
        required: [true, 'A reference to this query not found']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

module.exports = mongoose.model('Response', ResponseSchema)