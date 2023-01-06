const { model } = require("mongoose");
const Model = require("./model");

function addChat(chat) {
    const newChat = new Model(chat);
    return newChat.save();
}

function listChat(userId) {
    let filter = {};
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId) {
            filter = {
                users: userId
            } 
        }
        Model.find(filter)
            .populate("users")
            .exec((error, populated) => {
                if (error) {
                    return reject(error);
                }
                return resolve(populated);
            })
            
    })
}

module.exports = {
    add: addChat,
    list: listChat
}