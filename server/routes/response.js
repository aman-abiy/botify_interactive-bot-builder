const express = require('express');
const router = express.Router();

const responseController = require('../controllers/responseCont')

router.post('/add/:queryId', responseController.add);

router.get('/get/:responseId', responseController.get);

router.get('/getAll/:queryId', responseController.getAll);

router.get('/getLast30Days/:queryId', responseController.getLast30Days);

router.get('/download/:fmt/:queryId', responseController.handleDownload);

router.put('/update/:responseId', responseController.update);

router.delete('/delete/:responseId', responseController.delete);

module.exports = router;