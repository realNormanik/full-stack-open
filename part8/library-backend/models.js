const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  born: { type: Number }
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  published: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [{ type: String, required: true }]
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  favoriteGenre: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

module.exports = { User, Book, Author };