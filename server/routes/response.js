const express = require('express');
const router = express.Router();

const responseController = require('../controllers/responseCont')

router.post('/add', responseController.add);

router.get('/get/:responseId', responseController.get);

router.get('/getAll/:queryId', responseController.getAll);

router.get('/getLast30Days/:queryId', responseController.getLast30Days);

router.put('/update/:responseId', responseController.update);

router.delete('/delete/:responseId', responseController.delete);

module.exports = router;