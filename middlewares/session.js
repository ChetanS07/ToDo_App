const express = require('express')
const session = require('express-session')
const cookie = require('cookie-parser')
const MongoDBStore = require('connect-mongodb-session')(session)

const app = express()

const store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'mySessions'
})

store.on('error', (err) => {
    console.log('Error in Session Store');
    console.log(err);
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    store: store,
    resave: true,
    saveUninitialized: true
}))

module.exports = app