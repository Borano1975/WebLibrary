const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ISBN: {
        type: Number,
        required: false,
        trim: true
    },
    cover: {
        type: Buffer,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Author'
    }
}, {
    timestamps: true
})

bookSchema.virtual('book', {
    ref: 'BookCategory',
    localField: '_id',
    foreignField: 'book'
})

bookSchema.methods.toJSON = function () {
    const bookObject = this.toObject()
    delete bookObject.cover
    return bookObject
}

const Book = mongoose.model('Book', bookSchema)

module.exports = Book


/*

    category: [//many categories w name. Put name into lowercase so we can search easily.
        {
            name: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            }
        }
    ]
*/