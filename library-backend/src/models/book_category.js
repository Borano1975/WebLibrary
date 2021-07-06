const mongoose = require('mongoose')

const book_categorySchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Book'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Category'
    }
})

const BookCategory = mongoose.model('BookCategory', book_categorySchema)

module.exports = BookCategory