const express = require('express')
const lodash = require('lodash')
const path = require('path')
require('dotenv').config()
require('./config/mongooseConnection')

const app = express()
const port = process.env.PORT || 8000
const session = require('./middlewares/session')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(session)

app.use('/', require('./routes/routes'))
app.use('/auth', require('./routes/googleAuth'))

app.listen(port, (err) => {
    if (err) {
        console.log('Failed to Start Server');
    } else
        console.log('Server listening to port ', port);
})



