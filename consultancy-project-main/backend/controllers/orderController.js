const Order = require('../models/Order');
const User = require('../models/User');
const Razorpay = require('razorpay');
const crypto = require('crypto');

function normalizeOrderItems(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return { items: [], error: 'Order items are required' };
  }

  const normalizedItems = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const price = Number(item.price || 0);

    return {
      productId: String(item.productId || ''),
      name: String(item.name || ''),
      quantity,
      price,
      subtotal: quantity * price,
    };
  });

  const invalidItem = normalizedItems.find((item) => !item.productId || !item.name || item.quantity < 1 || item.price < 0);
  if (invalidItem) {
    return { items: [], error: 'Invalid order items' };
  }

  return { items: normalizedItems, error: null };
}

function buildRazorpayClient() {
  const keyId = String(process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim();

  if (!keyId || !keySecret) {
    const err = new Error('Razorpay is not configured. Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET.');
    err.status = 503;
    throw err;
  }

  return {
    keyId,
    keySecret,
    client: new Razorpay({ key_id: keyId, key_secret: keySecret }),
  };
}

async function createOrder(req, res, next) {
  try {
    const { items = [] } = req.body;
    const normalized = normalizeOrderItems(items);
    if (normalized.error) {
      return res.status(400).json({ message: normalized.error });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const normalizedItems = normalized.items;

    const totalAmount = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await Order.create({
      user: user._id,
      userSnapshot: {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
      },
      items: normalizedItems,
      totalAmount,
      status: 'placed',
      payment: {
        method: 'cod',
        status: 'pending',
        amountPaid: 0,
        currency: String(process.env.RAZORPAY_CURRENCY || 'INR').toUpperCase(),
      },
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: order._id,
        totalAmount: order.totalAmount,
        itemCount: order.items.length,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function createRazorpayOrder(req, res, next) {
  try {
    const { items = [] } = req.body;
    const normalized = normalizeOrderItems(items);
    if (normalized.error) {
      return res.status(400).json({ message: normalized.error });
    }

    const user = await User.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalAmount = normalized.items.reduce((sum, item) => sum + item.subtotal, 0);
    const amountInPaise = Math.round(totalAmount * 100);
    if (amountInPaise < 100) {
      return res.status(400).json({ message: 'Minimum payable amount is INR 1.00' });
    }

    const { client, keyId } = buildRazorpayClient();
    const currency = String(process.env.RAZORPAY_CURRENCY || 'INR').toUpperCase();

    const razorpayOrder = await client.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `order_${String(req.user.id).slice(-8)}_${Date.now()}`,
      notes: {
        userId: String(user._id),
        userEmail: String(user.email || ''),
      },
    });

    return res.json({
      keyId,
      currency,
      amount: amountInPaise,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (err) {
    return next(err);
  }
}

async function verifyRazorpayPayment(req, res, next) {
  try {
    const {
      items = [],
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'Missing Razorpay payment verification fields.' });
    }

    const normalized = normalizeOrderItems(items);
    if (normalized.error) {
      return res.status(400).json({ message: normalized.error });
    }

    const { keySecret } = buildRazorpayClient();
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
    }

    const existingOrder = await Order.findOne({ 'payment.razorpayPaymentId': razorpayPaymentId }).lean();
    if (existingOrder) {
      return res.status(200).json({
        message: 'Payment already verified for this order.',
        order: {
          id: existingOrder._id,
          totalAmount: existingOrder.totalAmount,
          itemCount: existingOrder.items.length,
          createdAt: existingOrder.createdAt,
        },
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalAmount = normalized.items.reduce((sum, item) => sum + item.subtotal, 0);
    const currency = String(process.env.RAZORPAY_CURRENCY || 'INR').toUpperCase();

    const order = await Order.create({
      user: user._id,
      userSnapshot: {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
      },
      items: normalized.items,
      totalAmount,
      status: 'placed',
      payment: {
        method: 'razorpay',
        status: 'paid',
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        amountPaid: totalAmount,
        currency,
      },
    });

    return res.status(201).json({
      message: 'Payment verified and order placed successfully.',
      order: {
        id: order._id,
        totalAmount: order.totalAmount,
        itemCount: order.items.length,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function getAdminOrders(req, res, next) {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      totalOrders: orders.length,
      totalBuyers: new Set(orders.map((order) => String(order.user))).size,
      orders,
    });
  } catch (err) {
    next(err);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      totalOrders: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteAdminOrder(req, res, next) {
  try {
    const { orderId } = req.params;
    const deleted = await Order.findByIdAndDelete(orderId).lean();

    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({
      message: 'Order deleted successfully',
      id: deleted._id,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createOrder, createRazorpayOrder, verifyRazorpayPayment, getAdminOrders, getMyOrders, deleteAdminOrder };
