const Appointment = require('../models/Appointment');
const User = require('../models/User');

async function createAppointment(req, res, next) {
  try {
    const {
      name,
      phone,
      email,
      location,
      date,
      time,
      service,
      contactMethod,
      farmSize,
      message = '',
    } = req.body || {};

    const requiredFields = { location, date, time, service, contactMethod, farmSize };
    const missing = Object.entries(requiredFields).find(([, value]) => !String(value || '').trim());
    if (missing) {
      return res.status(400).json({ message: `${missing[0]} is required` });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: 'Please sign in to book an appointment' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resolvedName = String(user.name || name || '').trim();
    const resolvedEmail = String(user.email || email || '').trim().toLowerCase();
    const resolvedPhone = String(user.phone || phone || '').trim();

    if (!resolvedName || !resolvedEmail || !resolvedPhone) {
      return res.status(400).json({ message: 'Name, email and phone are required for booking. Please update your account details.' });
    }

    const appointment = await Appointment.create({
      name: resolvedName,
      phone: resolvedPhone,
      email: resolvedEmail,
      location: String(location).trim(),
      date: String(date).trim(),
      time: String(time).trim(),
      service: String(service).trim(),
      contactMethod: String(contactMethod).trim(),
      farmSize: String(farmSize).trim(),
      message: String(message || '').trim(),
      status: 'pending',
      submittedBy: user._id,
      userSnapshot: {
        name: user.name,
        email: user.email,
        phone: user.phone || resolvedPhone,
        role: user.role,
      },
    });

    return res.status(201).json({
      message: 'Appointment request submitted successfully',
      appointment: {
        id: appointment._id,
        name: appointment.name,
        phone: appointment.phone,
        email: appointment.email,
        location: appointment.location,
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        contactMethod: appointment.contactMethod,
        farmSize: appointment.farmSize,
        message: appointment.message,
        status: appointment.status,
        createdAt: appointment.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function getAdminAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find({})
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter((item) => item.status === 'pending').length,
      appointments,
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteAdminAppointment(req, res, next) {
  try {
    const { appointmentId } = req.params;
    const deleted = await Appointment.findByIdAndDelete(appointmentId).lean();

    if (!deleted) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.json({
      message: 'Appointment deleted successfully',
      id: deleted._id,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createAppointment, getAdminAppointments, deleteAdminAppointment };
