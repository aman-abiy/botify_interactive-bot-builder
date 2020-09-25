const express = require('express');
const router = express.Router();

const responseController = require('../controllers/responseCont')

router.post('/add', responseController.add);

router.get('/get/:responseId', responseController.get);

router.put('/update/:responseId', responseController.update);

router.delete('/delete/:responseId', responseController.delete);

module.exports = router;