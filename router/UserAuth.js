const UserAuth = require('../model/UserAuth')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    const getData = await UserAuth.find({}).sort({createdAt: -1})
    res.status(200).json(getData)
})

router.post('/login', async (req, res) => {
        const user = await UserAuth.findOne({ username: req.body.username})
        const isPasswordHash = await bcrypt.compare(req.body.password, user.password)
        if(isPasswordHash) {
            let token = jwt.sign({ user }, 'secret123');
            return res.status(200).json({ message: 'ok', user: token })
        } else {
            return res.status(400).json({ message: 'error', user: false })
        }
})

router.post('/register', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    try {
        const User = await UserAuth.create({
            username: req.body.username,
            password: hashPassword
        })
        res.status(200).json(User)
    } catch (error) {
        res.json({
            errorMessage: 'error', error,
            status: false            
        })
    }

})

module.exports = router