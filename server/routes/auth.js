const express = require('express');
const router = express.Router()
const isAuth = require('../middleware/isAuth');

const authController = require('../controllers/authCont');

router.post('/signup', authController.signup);

router.post('/login', authController.login)

router.get('/verify/:token', authController.verifyAccount)

router.get('/resendVerification/:email', authController.resendVerificationToken)

router.get('/sendPasswordResetLink/:email', authController.sendPasswordResetLink)

router.post('/resetPassword/:token', authController.resetPassword)

router.get('/validateAuth', isAuth)

module.exports = router;