const express = require('express');
const { askQuestion, getHistory, clearHistory } = require('../controllers/chatController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.use(optionalAuth);
router.post('/ask', askQuestion);
router.get('/history', getHistory);
router.delete('/history', clearHistory);

module.exports = router;