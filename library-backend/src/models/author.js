const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: false
    }
})

authorSchema.virtual('author', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author