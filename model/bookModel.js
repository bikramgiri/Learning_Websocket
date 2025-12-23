const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
module.exports = Book;