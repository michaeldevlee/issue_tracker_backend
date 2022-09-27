const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/getUser', usersController.getUser);
router.post('/searchUsers', usersController.searchUsers);
router.post('/createUser', usersController.createUser);
router.delete('/deleteUser', usersController.deleteUser);

module.exports = router;