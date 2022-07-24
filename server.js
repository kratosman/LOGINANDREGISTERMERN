const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const UserAuth = require('./router/UserAuth')

app.use(cors())
app.use(express.json())
app.use('/auth', UserAuth)

mongoose.connect('mongodb+srv://oracle14300101:oracle14300101@cluster0.kie0o.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to the database!')
        app.listen(3006, () => {
            console.log('App listening to port 3006')
        })
    })
