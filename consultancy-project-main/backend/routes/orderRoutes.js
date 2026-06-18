const express = require('express');
const { createOrder, createRazorpayOrder, verifyRazorpayPayment, getAdminOrders, getMyOrders, deleteAdminOrder } = require('../controllers/orderController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, createOrder);
router.post('/razorpay/order', requireAuth, createRazorpayOrder);
router.post('/razorpay/verify', requireAuth, verifyRazorpayPayment);
router.get('/my', requireAuth, getMyOrders);
router.get('/admin', requireAuth, requireAdmin, getAdminOrders);
router.delete('/admin/:orderId', requireAuth, requireAdmin, deleteAdminOrder);

module.exports = router;
