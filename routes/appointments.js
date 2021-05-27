const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
const appointmentsController = require('../controllers/appointments');

router.get('/:id', isAuth, appointmentsController.getAppointments);
router.put('/edit/:id', isAuth, appointmentsController.editAppointment);
router.put('/buyer/:id', isAuth, appointmentsController.postBuyerAppointments);

module.exports = router;