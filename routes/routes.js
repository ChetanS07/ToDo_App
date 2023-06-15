const express = require('express')
const app = express()

const auth = require('../middlewares/auth')
const { getListItems, getListNames, renderList, addList, addItem, deleteList, deleteItem } = require('../controllers/dbController')
const { register, login, logout } = require('../controllers/userController')

app.get('/', auth, async (req, res) => {
    if (req.isAuth) {
        //access db
        const userId = req.session.userId
        const listItems = await getListItems(userId, 'ToDo');
        const listNames = await getListNames(userId)
        res.render('index.ejs', { itemsList: listItems, listNames: listNames })
    } else {
        res.redirect('/login')
    }
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

//usr routes
app.get('/logout', auth, logout)
app.post('/login', login)
app.post('/register', register)

//db routes
app.post('/db/addItem', auth, addItem)
app.post('/db/createList', auth, addList)
app.post('/db/deleteList', auth, deleteList)
app.post('/db/deleteItem', auth, deleteItem)
app.get('/:listName', auth, renderList)

module.exports = app