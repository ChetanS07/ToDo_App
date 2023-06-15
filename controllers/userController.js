const bcrypt = require('bcrypt')
const { User } = require('../models/userModel')
const { Item } = require('../models/itemModel')
const { lists } = require('../config/dbData')

const saltRounds = 10;

const register = async (req, res) => {
    const userId = req.body.userId || req.user.id
    const password = req.body.password || req.user.emails[0].value;
    // console.log(req.user);
    // console.log('In /register : ', req.body);

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    User.findOne({ userId: userId }).then((user) => {
        if (user === null || user === undefined) {
            console.log('Registering : User Not Found...');

            const user = new User({
                userId: userId,
                password: hashedPassword,
                lists: lists
            })
            user.save();
            console.log('Registering : Created User : ' + user);
        } else {
            console.log('Registering : User Found : ' + user);
        }
        req.session.userId = userId
        req.session.save((err) => {
            if (err) {
                console.log('Failed to save Session...');
                console.log(err);
            } else {
                console.log('Saved Session Successfully');
            }
        })
        console.log('Registering : Registered User');
        res.redirect('/')
    }).catch(err => {
        console.log('Registering : Error Occured while creating User');
        console.log(err);
        res.redirect('/')
    })
}

const login = async (req, res) => {

    const userId = req.body.userId
    const password = req.body.password

    User.findOne({ userId: userId }).then((user) => {
        if (user === null || user === undefined) {
            console.log('Logging In : User Not Found...');
        } else {
            console.log('Logging In : User Found : ' + user);
            const userValid = checkPassword(password, user.password)
            if (userValid) {
                req.session.userId = userId
                req.session.save((err) => {
                    if (err) {
                        console.log('Logging In : Failed to save Session...');
                        console.log(err);
                    } else {
                        console.log('Logging In : Saved Session Successfully');
                    }
                })
                console.log('Logging In : Logged In successfully');
            } else {
                console.log('Logging In : Password Doesnt match...');
            }
        }
    }).catch(err => {
        console.log('Error Occured while Logging in');
        console.log(err);
    })
    res.redirect('/')
}

const checkPassword = async (hashedPassword, password) => {
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
        return true
    } else
        return false
}

const logout = async (req, res) => {
    //cookie is not deleted but replaced after new login
    req.session.cookie.expires = new Date()
    req.session.userId = null
    req.session.destroy()
    console.log('Logged Out Successfully...');
    res.redirect('/')
}

module.exports = {
    login: login,
    logout: logout,
    register: register
}