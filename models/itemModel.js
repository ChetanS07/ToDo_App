const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const itemSchema = new Schema({
    itemName: { type: String, required: true },
    finished: Boolean
})

const Item = mongoose.model('Item', itemSchema)

module.exports = {
    Item: Item,
    itemSchema: itemSchema
}