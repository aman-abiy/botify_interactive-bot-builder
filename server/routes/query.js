const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')

const queryController = require('../controllers/queryCont');

router.post('/add', isAuth, queryController.add);

router.get('/get/:queryId', isAuth, queryController.get);

router.get('/getAll', isAuth, queryController.getAllQueries);

router.put('/update/:queryId', queryController.update);

router.put('/changeStatus/:queryId', queryController.changeStatus);

router.delete('/delete/:queryId', queryController.delete);

module.exports = router;