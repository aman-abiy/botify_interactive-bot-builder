const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Subscriber = require('../models/Subscriber');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.signup = asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const subscriber = await Subscriber.create(req.body);

    if (!subscriber) {
        return next(new ErrorResponse('User not created', 500));
    }
    const token = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        token
    })
})

exports.login = asyncHandler(async(req, res, next) => {
    console.log(req)
    const { email, password } = req.body;

    const subscriber = await Subscriber.findOne({ email }).select('password');
    if (!subscriber) {
        return next(new ErrorResponse(`User with email ${email} not found`, 500));
    }
    const isMatched = await bcrypt.compare(password, subscriber.password);
    if (!isMatched) {
        return next(new ErrorResponse('Password incorrect', 400));
    }
    const token = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        token
    })
})