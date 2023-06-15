const { List } = require('../models/listModel')

const defaultList = new List({
    listName: 'ToDo',
    listType: 'default',
    itemList: []
})


module.exports = {
    lists: [defaultList]
}