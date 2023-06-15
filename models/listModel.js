const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { itemSchema } = require('./itemModel')


const listSchema = new Schema({
    listName: { type: String, required: true },
    listType: { type: String, required: true },
    itemList: [itemSchema]
});

const List = mongoose.model('List', listSchema)

module.exports = {
    List: List,
    listSchema: listSchema
}