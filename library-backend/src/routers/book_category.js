const express = require('express')
const BookCategory = require('../models/book_category')
const auth = require('../middleware/auth')

const router = new express.Router()
const cors = require('cors')
router.use(cors())

router.post('/bookcategory', async(req, res) => {
    const bookcategory = new BookCategory({
        ...req.body,
        book: req.body.book_id,
        category: req.body.category_id
    })
    try{
        await bookcategory.save()
        res.status(200).send(bookcategory)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/bookcategory', async (req, res) => {
    try {
        const bookcategory = await BookCategory.find({})
        res.status(200).send(bookcategory)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/bookcategory/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const bookcategory = await BookCategory.findById(_id)
        if (!bookcategory){
            return res.status(404).send()
        }
        res.status(200).send(bookcategory)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/bookcategory/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const bookcategory = await BookCategory.findByIdAndDelete(_id)
        if (!bookcategory){
            return res.status(404).send({ error: 'BookCategory Relationship not found.' })
        }
        res.status(200).send(bookcategory)
    } catch (e) {
        return res.status(400).send(e)
    }
})

module.exports = router