const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
const slotsController = require('../controllers/slots');

router.get('/:id', isAuth, slotsController.getSlots);

router.put('/:id', isAuth, slotsController.postSlots);

module.exports = router;