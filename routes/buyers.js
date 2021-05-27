const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
const buyersController = require('../controllers/buyers');

router.put('/signup', buyersController.signup);
router.post('/login', buyersController.login);

module.exports = router;