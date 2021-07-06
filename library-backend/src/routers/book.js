const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Book = require('../models/book')
const Category = require('../models/category')
const BookCategory = require('../models/book_category')
const auth = require('../middleware/auth')


const router = new express.Router()
const cors = require('cors')
router.use(cors())

router.post('/books', auth, async(req, res) => {
    for (let i = 0; i < req.body.category.length; i++) {
        //searching for new category
        const newcat = await Category.findOne( {'name': req.body.category[i].name} )
        //if category doesnt exist,create and save book_category instance with the bookid and cat id.
        if (!newcat){
            const newcat2 = await new Category(req.body.category[i])
            await newcat2.save()
            const bookcategory = await new BookCategory({book: req.body._id, category: newcat2._id})
            await bookcategory.save()
        }else{ //else(if the category already exists and its found), create book_category and save id's
            const bookcategory = await new BookCategory({book: req.body._id, category: newcat._id})
            await bookcategory.save()
        }
    }
    const book = new Book({
        ...req.body,
        author: req.body.author_id
    })
    try{
        await book.save()
        res.status(200).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})


//fetching all books.
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).send(books)
    } catch (e) {
        res.status(500).send(e)
    }
})

//fetching books by id.
router.get('/books/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findById(_id)
        if (!book){
            return res.status(404).send()
        }
        res.status(200).send(book)
    } catch (e) {
        res.status(500).send(e)
    }
})

//updating books by id.
router.patch('/books/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'ISBN', 'author', 'category']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update requested.' })
    }

    const _id = req.params.id
    try {
        const book = await Book.findById(_id)
        updates.forEach((update) => {
            book[update] = req.body[update]
        })
        await book.save()
        
        if(!book) {
            return res.status(404).send({ error: 'Book not found.' })
        }
        res.status(200).send(book)
    } catch (e) {
        return res.status(400).send(e)
    }
})

//deleting books by id.
router.delete('/books/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const book = await Book.findByIdAndDelete(_id)
        if (!book){
            return res.status(404).send({ error: 'Book not found.' })
        }
        res.status(200).send(book)
    } catch (e) {
        return res.status(400).send(e)
    }
})

const upload = multer ({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

//adding cover for books by bookId
router.post('/books/:id/cover', auth, upload.single('cover'), async (req, res) => {
    const _id = req.params.id
    try {
        const book = await Book.findById(_id)
        if (!book) {
            return res.status(404).send({ error: 'Book not found.' })
        }
        const buffer = await sharp(req.file.buffer).resize({ width: 1600, height: 2560 }).png().toBuffer()
        book.cover = buffer
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({error : error.message})
})

//deleting cover of book by bookId.
router.delete('/books/:id/cover', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const book = await Book.findById(_id)
        if (!book) {
            return res.status(404).send({ error: 'Book not found.' })
        }
        book.cover = undefined
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

//fetching cover of book by bookId
router.get('/books/:id/cover', async (req, res) => {
    const _id = req.params.id
    try {
        const book = await Book.findById(_id)
        if (!book || !book.cover) {
            return res.status(404).send({ error: 'Book not found.' })
        }
        res.set('Content-Type', 'image/jpg')
        res.send(book.cover)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router


/*

//post request for: creating new book, connecting/creating author and categories in the relationship.
//its gonna check if the author with that name already exists:
//       if the author does exist, it is going to save its author id.
//       if the author does NOT exist, it is going to create it and then save its id.
//then, its going to check whether those categories already exist:
//       if they do, its gonna save the category ids,
//       if they dont, its going to create the category then save the id.
router.post('/books', auth, async (req, res) => {
    try {
        const author = await Author.findOne( {'name': req.body.author.name} )
        if (!author){
            const author = await new Author(req.body.author)
            await author.save()
        }
        
        await author.save()
        
        for (let i = 0; i < req.body.category.length; i++) {
            //searching for new category
            const newcat = await Category.findOne( {'name': req.body.category[i].name} )
            //if category doesnt exist,create and save book_category instance with the bookid and cat id.
            if (!newcat){
                const newcat2 = await new Category(req.body.category[i])
                await newcat2.save()
                const bookcategory = await new BookCategory({book: req.body._id, category: newcat2._id})
                await bookcategory.save()
            }else{ //else(if the category already exists and its found), create book_category and save id's
                const bookcategory = await new BookCategory({book: req.body._id, category: newcat._id})
                await bookcategory.save()
            }
        }

        //now that we have fixed author and category/ies, we can create and save the book.
        const book = await new Book({...req.body, author: author._id})
        await book.save()
        res.status(201).send({book, author})
    } catch (e) {
        res.status(400).send(e)
    }
})
*/