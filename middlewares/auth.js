const express = require('express')
const app = express()

const authorize = (req, res, next) => {
    const userId = req.session.userId
    if (userId) {
        req.isAuth = true
    } else {
        req.isAuth = false
    }
    next()
}

app.use(authorize)

module.exports = app