const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    guestSessionId: { type: String, trim: true, index: true, default: '' },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    model: { type: String, default: '' },
  },
  { timestamps: true }
);

chatMessageSchema.pre('validate', function ensureChatOwner(next) {
  if (!this.user && !this.guestSessionId) {
    return next(new Error('Either user or guestSessionId is required for chat messages'));
  }
  return next();
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);