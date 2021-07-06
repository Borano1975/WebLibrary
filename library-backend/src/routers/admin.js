const express = require('express')
const Admin = require('../models/admin')
const auth = require('../middleware/auth')

const router = new express.Router()
const cors = require('cors')
router.use(cors())
//creating a new admin.
router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body)

    try {
        await admin.save()
        const token = await admin.generateToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


//admin login
router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateToken()
        res.status(200).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//admin logout
router.post('/admin/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//admin logout all sessions.(deletes all tokens)
router.post('/admin/logoutALL', auth, async (req,res) => {
    try{
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//fetching profile.
router.get('/admin/me', auth, async (req, res) => {
    res.send(req.admin)
})


//edit admin
router.patch('/admin/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    //in case we add non-updatable fields later on:
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update requested.' })
    }

    try {
        updates.forEach((update) => {
            req.admin[update] = req.body[update]
        })
        await req.admin.save()
        res.status(200).send(req.admin)
    } catch (e) {
        return res.status(400).send(e)
    }
})

//deleting admin if authenticated.
router.delete('/admin/me', auth, async (req, res) => {
    try {
        await req.admin.remove()
        res.status(200).send(req.admin)
    } catch (e) {
        return res.status(400).send(e)
    }
})

module.exports = router