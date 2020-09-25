const express = require('express');
const router = express.Router()

const authController = require('../controllers/authCont');

router.post('/signup', authController.signup);

router.get('/login', authController.login)

module.exports = router;