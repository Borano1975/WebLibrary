const express = require('express')
const Category = require('../models/category')
const auth = require('../middleware/auth')

const router = new express.Router()
const cors = require('cors')
router.use(cors())
//creating new category. - requires authentication.
router.post('/category', auth, async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

//fetching all categories. - no authentication required.
router.get('/category', async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).send(category)
    } catch (e) {
        res.status(500).send(e)
    }
})

//fetching category by id. - no authentication required.
router.get('/category/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const category = await Category.findById(_id)
        if (!category){
            return res.status(404).send()
        }
        res.status(200).send(category)
    } catch (e) {
        res.status(500).send(e)
    }
})

//updating categories by id. - requires authentication.
router.patch('/category/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update requested.' })
    }

    const _id = req.params.id
    try {
        const category = await Category.findById(_id)
        updates.forEach((update) => {
            category[update] = req.body[update]
        })
        await category.save()
        
        if(!category) {
            return res.status(404).send({ error: 'Category not found.' })
        }
        res.status(200).send(category)
    } catch (e) {
        return res.status(400).send(e)
    }
})

//deleting categories by id. - requires authentication.
router.delete('/category/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const category = await Category.findByIdAndDelete(_id)
        if (!category){
            return res.status(404).send({ error: 'Category not found.' })
        }
        res.status(200).send(category)
    } catch (e) {
        return res.status(400).send(e)
    }
})

module.exports = router