const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');
const ErrorResponse = require('../utils/errorResponse');

const isAuth = async(req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(res.status(401).json({
                    status: false,
                    msg: 'User authorization error: error identifying token'
                }))
                // return next(new ErrorResponse('User authorization error: error identifying token', 401))
        }

        try {
            const subscriberId = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const subscriber = await Subscriber.findById(mongoose.Types.ObjectId(subscriberId.id));
            if (!subscriber) {
                return next(res.status(401).json({
                        status: false,
                        msg: 'User authorization error: account not found'
                    }))
                    // return next(new ErrorResponse('User authorization error: account not found', 401))
            }
            req.subscriber = subscriber;
            return next();
        } catch (error) {
            return next(res.status(401).json({
                    status: false,
                    msg: 'User authorization error: error verifying token'
                }))
                // return next(new ErrorResponse('User authorization error: error verifying token', 401))
        }
    }
    return next(res.status(401).json({
        status: false,
        msg: 'User authorization error: header authorization not set'
    }))

    // return next(new ErrorResponse('User authorization error: header authorization not set', 401))
}

module.exports = isAuth;