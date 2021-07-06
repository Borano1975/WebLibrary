const express = require('express')
const Author = require('../models/author')
const auth = require('../middleware/auth')

const router = new express.Router()
const cors = require('cors')
router.use(cors())

//creating new author. - requires authentication.
router.post('/author', async (req, res) => {
    console.log(req.body.author)
    const author = new Author(req.body)
    try {
        await author.save()
        res.status(201).send(author)
    } catch (e) {
        res.status(400).send(e)
    }
})

//fetching all authors. - no authentication required.
router.get('/author', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.status(200).send(authors)
    } catch (e) {
        res.status(500).send(e)
    }
})

//fetching author by id. - no authentication required.
router.get('/author/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const author = await Author.findById(_id)
        if (!author){
            return res.status(404).send()
        }
        res.status(200).send(author)
    } catch (e) {
        res.status(500).send(e)
    }
})

//updating authors by id. - requires authentication.
router.patch('/author/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'bio']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update requested.' })
    }

    const _id = req.params.id
    try {
        const author = await Author.findById(_id)
        updates.forEach((update) => {
            author[update] = req.body[update]
        })
        await author.save()
        
        if(!author) {
            return res.status(404).send({ error: 'Author not found.' })
        }
        res.status(200).send(author)
    } catch (e) {
        return res.status(400).send(e)
    }
})

//deleting authors by id. - requires authentication.
router.delete('/author/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const author = await Author.findByIdAndDelete(_id)
        if (!author){
            return res.status(404).send({ error: 'Author not found.' })
        }
        res.status(200).send(author)
    } catch (e) {
        return res.status(400).send(e)
    }
})



module.exports = router