const express = require('express');
const router = express.Router();

const queryController = require('../controllers/queryCont');

router.post('/add', queryController.add);

router.get('/get', queryController.get);

router.put('/update/:queryId', queryController.update);

router.delete('/delete/:queryId', queryController.delete);

module.exports = router;