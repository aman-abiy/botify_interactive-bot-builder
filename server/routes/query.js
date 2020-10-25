const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')

const queryController = require('../controllers/queryCont');

router.post('/add', isAuth, queryController.add);

router.get('/get/:queryId', queryController.get);

router.get('/getActive', isAuth, queryController.getActive);

router.get('/getAll', isAuth, queryController.getAllQueries);

router.put('/update/:queryId', queryController.update);

router.put('/changeStatus/:queryId', queryController.changeStatus);

router.delete('/delete/:queryIds', queryController.delete);

module.exports = router;