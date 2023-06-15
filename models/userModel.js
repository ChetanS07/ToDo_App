const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { listSchema } = require('./listModel')

const userSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    password: { type: String },
    lists: [listSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User: User
}