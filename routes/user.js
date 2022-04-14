const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');



router.get('/', userController.index);
// router.get('/:id', userController.index);

module.exports = router;