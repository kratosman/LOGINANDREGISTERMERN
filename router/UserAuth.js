const UserAuth = require('../model/UserAuth')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Get all data from user 
router.route('/data').get(async (req, res) => {
    const getData = await User.find({}).sort({createdAt: -1})
    res.status(200).json(getData)
})
//login
router.route('/login').post(async (req, res) => {
    const dataLoggein = await User.findOne({ email: req.body.email})
    const isPasswordHash = await bcrypt.compare(req.body.password, dataLoggein.password) 
    if(isPasswordHash) {
        let token = jwt.sign({ dataLoggein }, 'secretLove123');
        return res.status(200).json({ message : 'ok', dataLoggein:token})
    } else {
        return res.status(400).json({ message : 'error', dataLoggein:false})
    }
})
//register
router.route('/register').post(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
   try {
    if(req.body && req.body.username && req.body.email && req.body.password) {
        User.find({ email: req.body.email}, (err, data) => {
            if (data.length == 0) { 
                const createUser = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    email: req.body.email
                })
                createUser.save((err, data) => {
                    if( err ){
                        res.status(400).json({
                            msg: err,
                            status: false
                        })
                    } else {
                        res.status(200).json({
                            success:"Successfully Registered!",
                            status: true
                        }) 
                    }
                })
            } else {
                res.status(400).json({
                    msg: `Email ${req.body.email} Already Exsist!`,
                    status: false
                })
            }
        })
    } else {
        res.status(400).json({
            msg: 'Fields are Empty!',
            status: false
        })
    }
   } catch (error) {
    res.status(200).json({
        success:"Something went wrong!",
        status: false
    }) 
   }
    
})
module.exports = router;
module.exports = router
