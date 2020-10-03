const express = require('express');
const router = express.Router()
const isAuth = require('../middleware/isAuth');

const authController = require('../controllers/authCont');

router.post('/signup', authController.signup);

router.post('/login', authController.login)

router.get('/validateAuth', isAuth)

module.exports = router;