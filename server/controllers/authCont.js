const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Subscriber = require('../models/Subscriber');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.signup = asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
        return res.status(201).json({
            status: false,
            msg: 'User already exists'
        })
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    subscriber = await Subscriber.create(req.body);

    if (!subscriber) {
        return res.status(201).json({
            status: false,
            msg: 'User not created'
        })
    }
    const token = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        email,
        token
    })
})

exports.login = asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    const subscriber = await Subscriber.findOne({ email }).select('password');
    if (!subscriber) {
        return res.status(200).json({
            status: false,
            msg: `User not found`
        });
    }
    const isMatched = await bcrypt.compare(password, subscriber.password);
    if (!isMatched) {
        return res.status(200).json({
            status: false,
            msg: 'Password Incorrect'
        });
    }
    const token = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        email,
        token
    })
})