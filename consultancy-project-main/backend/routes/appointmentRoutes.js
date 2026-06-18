const express = require('express');
const { createAppointment, getAdminAppointments, deleteAdminAppointment } = require('../controllers/appointmentController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, createAppointment);
router.get('/admin', requireAuth, requireAdmin, getAdminAppointments);
router.delete('/admin/:appointmentId', requireAuth, requireAdmin, deleteAdminAppointment);

module.exports = router;
