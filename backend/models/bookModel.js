const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating between 1 and 5
  },
  status: {
    type: String,
    enum: ['read', 'unread', 'pending'], // Enum for status
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);
