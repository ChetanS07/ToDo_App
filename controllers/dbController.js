const { User } = require('../models/userModel')
const { List } = require('../models/listModel')
const { Item } = require('../models/itemModel')

const getListItems = async (userId, listName) => {

    let itemsList;
    try {
        const user = await User.findOne({ userId: userId })
        user.lists.forEach(list => {
            if (list.listName === listName) {
                itemsList = list
            }
        })

        if (itemsList) {
            console.log('getListItems : Fetched itemsList successfully : ', itemsList);
            return itemsList
        } else {
            console.log('getListItems : The list requested is not available, returning default list : ', user.lists[0]);
            return user.lists[0]
        }
    } catch (error) {
        console.log('getListItems : Error while getting listItems ');
        console.log(error);
        return []
    }
}

const getListNames = async (userId) => {

    try {
        const user = await User.findOne({ userId: userId })
        const lists = []
        user.lists.forEach(list => lists.push({ listName: list.listName, listType: list.listType }))

        console.log('getListNames : Fetched itemsNames successfully : ', lists);
        return lists
    } catch (error) {
        console.log('getListNames : Error while getting listNames');
        console.log(error);
        return []
    }

}

const renderList = async (req, res) => {

    const listName = req.params.listName
    const userId = req.session.userId

    if(req.isAuth){
        
    const itemsList = await getListItems(userId, listName)
    const lists = await getListNames(userId)

    if (itemsList && lists) {
        console.log('renderList : successfully rendering listNames and listItems');
        res.render('index.ejs', { itemsList: itemsList, listNames: lists });
    } else {
        console.log('renderList : Failed to render listNames and listItems');
        res.redirect('/')
    }
    }else{
        res.redirect('/')
    }

}

const addList = async (req, res) => {

    const userId = req.session.userId
    const listName = req.body.listName
    try {
        const user = await User.findOne({ userId: userId })
        const newList = new List({ listName: listName.slice(0, 20), listType: 'custom', itemList: [] })

        user.lists.push(newList)
        user.save();

        console.log('addList : Created New List : ' + newList);
    } catch (error) {
        console.log('addList : Error while creating List');
        console.log(error);
    }
    res.redirect('/')
}

const addItem = async (req, res) => {

    const userId = req.session.userId
    const itemName = req.body.itemName
    const listName = req.body.listName
    const newItem = new Item({ itemName: itemName.slice(0, 45), finished: false })
    try {
        const user = await User.findOne({ userId: userId })

        user.lists.forEach((list) => {
            if (list.listName === listName) {
                list.itemList.push(newItem)
            }
        })
        user.save();
        console.log('addItem : Added items : ' + newItem + ' to list : ' + listName);
    } catch (error) {
        console.log('addItem : Error while adding Item');
        console.log(error);
    }

    res.redirect('/' + listName)
    // res.redirect('/')
}

const deleteItem = async (req, res) => {

    const userId = req.session.userId
    const listName = req.body.listName
    const itemName = req.body.itemName
    try {
        const user = await User.findOne({ userId: userId })

        user.lists.forEach((list) => {
            if (list.listName === listName) {
                const index = list.itemList.findIndex((item) => {
                    return item.itemName === itemName
                })

                if (index !== -1) {
                    const removedItem = list.itemList.splice(index, 1)
                    console.log('deleteItem : removed item : ' + removedItem);
                } else {
                    console.log('deleteItem : Item Doesn\'t Exist');
                }
            }
        })
        user.save();
    } catch (error) {
        console.log('deleteItem : Error while deleting Item');
        console.log(error);
    }
    // res.redirect('/')
    res.redirect('/' + listName)
}

const deleteList = async (req, res) => {

    const userId = req.session.userId
    const listName = req.body.listName
    try {
        const user = await User.findOne({ userId: userId })

        const index = user.lists.findIndex(list => list.listName === listName)
        if (index !== -1) {
            const deletedList = user.lists.splice(index, 1);
            console.log('deleteList: Deleted List : ', deletedList);
        } else {
            console.log('deleteList : List Not Found : ', listName);
        }
        user.save()
    } catch (error) {
        console.log('deleteList : Error while deleting List');
        console.log(error);
    }
    res.redirect('/')
}

module.exports = {
    getListItems: getListItems,
    getListNames: getListNames,
    renderList: renderList,
    addList: addList,
    addItem: addItem,
    deleteItem: deleteItem,
    deleteList: deleteList
}
