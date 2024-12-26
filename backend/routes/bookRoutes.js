const express = require('express');
const router = express.Router();
const Book = require('.');

// Create a new book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      rating: req.body.rating,
      status: req.body.status,
    });
    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
