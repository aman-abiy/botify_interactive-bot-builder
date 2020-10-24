const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Subscriber = require('../models/Subscriber');
const ErrorResponse = require('../utils/errorResponse');
const SMTP = require('../utils/sendEmail')
const asyncHandler = require('../middleware/asyncHandler');

exports.signup = asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    console.log('signup', email, password)

    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
        if (!subscriber.verified) {
            return res.status(201).json({
                status: false,
                verified: false,
                msg: 'User not verified'
            })
        }
        return res.status(201).json({
            status: false,
            verified: true,
            msg: 'User already exists'
        })
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    const verificationToken = crypto.createHash('sha256').update(crypto.randomBytes(20).toString('hex')).digest('hex');
    req.body.verificationToken = verificationToken;

    subscriber = await Subscriber.create(req.body);
    console.log('sub', subscriber)
    if (!subscriber) {
        return res.status(201).json({
            status: false,
            verified: false,
            msg: 'User not created'
        })
    }

    // SEND EMAIL HERE
    const smtp = new SMTP(email, 'botapp - Email verification!',
        `<html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </head>
            <body style="background-color: rgb(250, 250, 250); padding: 10%">
                <h2 style="color: #0a67ca; font-family: sans-serif; text-align: center">Please verify your email</h4>
                <p style="color: #268af5; font-size: 17px; text-align: center">Click on the link below or copy and paste into browser to verify your account.</p>
                <a style="color: rgb(10, 211, 211); font-size: 15px; text-align" href="http://localhost:8080/verify/${verificationToken}">http://localhost:8080/verify/${verificationToken}</a>
                <br>
                <p style="text-align: center; font-size: 13px; color: grey;">${new Date().getFullYear()} botapp.com</p>
            </body>
        </html>`);
    smtp.send();
    console.log('email sent')
    const token = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        verified: false,
        email
        // token
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

    if (subscriber.verified == 0) {
        return res.status(200).json({
            status: false,
            msg: 'Please verify your email, a verification link is already sent to your email.'
        });
    }
    const token = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        email,
        token
    })
})

exports.verifyAccount = asyncHandler(async(req, res, next) => {
    const token = req.params.token;

    const subscriber = await Subscriber.findOne({ verificationToken: token })
    if (!subscriber) {
        return res.status(200).json({
            status: false,
            msg: 'Unable to verify account. Make sure the link has not been altered and try again'
        });
    }
    console.log(subscriber.verified)
    if (!subscriber.verified) {
        await Subscriber.findOneAndUpdate({ verificationToken: token }, { verified: 1 })
    }

    const jwtToken = jwt.sign({ id: subscriber._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({
        status: true,
        email: subscriber.email,
        token: jwtToken
    })
})

exports.resendVerificationToken = asyncHandler(async(req, res, next) => {
    const email = req.params.email;

    const subscriber = await Subscriber.findOne({ email })
    if (subscriber) {
        const newVerificationToken = crypto.createHash('sha256').update(crypto.randomBytes(20).toString('hex')).digest('hex');

        await Subscriber.findOneAndUpdate({ email }, { verificationToken: newVerificationToken })

        const smtp = new SMTP(email, 'botapp - Resent email verification!',
            `<html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                </head>
                <body style="background-color: rgb(250, 250, 250); padding: 10%">
                    <h2 style="color: #0a67ca; font-family: sans-serif; text-align: center">Please verify your email </h2>
                    <p style="color: #268af5; font-size: 17px; text-align: center">Click on the link below or copy and paste into browser to verify your account.</p>
                    <a style="color: rgb(10, 211, 211); font-size: 15px; text-align: center" href="http://localhost:8080/verify/${newVerificationToken}">http://localhost:8080/verify/${newVerificationToken}</a>
                    <br>
                    <p style="text-align: center; font-size: 13px; color: grey;">${new Date().getFullYear()} botapp.com</p>
                </body>
            </html>`);
        smtp.send();

        return res.status(200).json({
            status: true,
            msg: 'Verification link has been resent'
        })
    }
    return res.status(200).json({
        status: false,
        msg: 'Can not find email for this account'
    })
})

exports.sendPasswordResetLink = asyncHandler(async(req, res, next) => {
    const email = req.params.email;

    const subscriber = await Subscriber.findOne({ email })
    console.log(subscriber)
    if (subscriber) {
        if (subscriber.pwdResetTime && (subscriber.pwdResetTime >= Date.now())) {
            return res.status(200).json({
                status: false,
                msg: 'There is already an active password reset link sent to your email'
            })
        }

        const token = crypto.createHash('sha256').update(crypto.randomBytes(20).toString('hex')).digest('hex');
        await Subscriber.findOneAndUpdate({ email }, { pwdResetToken: token, pwdResetTime: Date.now() + (1000 * 60 * 30) })

        const smtp = new SMTP(email, 'botapp - Reset password!',
            `<html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                </head>
                <body style="background-color: rgb(250, 250, 250); padding: 10%">
                    <h2 style="color: #0a67ca; font-family: sans-serif; text-align: center">Reset your password</h2>
                    <p style="color: #268af5; font-size: 17px; text-align: center">Click on the link below or copy and paste into browser to set your new password.</p>
                    <a style="color: rgb(10, 211, 211); font-size: 15px; text-align: center" href="http://localhost:8080/reset-password/${token}">http://localhost:8080/reset-password/${token}</a>
                    <br>
                    <p style="text-align: center; font-size: 13px; color: grey;">${new Date().getFullYear()} botapp.com</p>
                </body>
            </html>`);
        smtp.send();

        return res.status(200).json({
            status: true,
            msg: 'Password resent link has been sent'
        })
    }
    return res.status(200).json({
        status: false,
        msg: 'Can not find email for this account'
    })
})

exports.resetPassword = asyncHandler(async(req, res, next) => {
    const token = req.params.token;
    const { password } = req.body;

    const subscriber = await Subscriber.findOne({ pwdResetToken: token })
    if (!subscriber || (subscriber.pwdResetTime < Date.now())) {
        return res.status(200).json({
            status: false,
            msg: 'This link has either expired or has been used'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    await Subscriber.findOneAndUpdate({ pwdResetToken: token }, { password: newPassword, pwdResetTime: Date.now() })
    return res.status(200).json({
        status: true,
        msg: 'Your password has been reset'
    })

})