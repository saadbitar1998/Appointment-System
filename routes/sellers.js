const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
const sellersController = require('../controllers/sellers');

router.get('/', isAuth, sellersController.getSellers);
router.get('/:id', isAuth, sellersController.getSeller);
router.put('/signup', sellersController.signup);
router.post('/login', sellersController.login);

module.exports = router;