const store = require("./store");

function addChat(users) {
    if (!users || users.length < 2 || !Array.isArray(users)) {
        return Promise.reject(`Número de usuarios no valido ${users.length}`);
    }

    const newChat = {
        users: users
    }

    return store.add(newChat);
}

function listChats(userId) {
    return new Promise((resolve, reject) => {
        resolve(store.list(userId));
    })
}

module.exports = {
    addChat,
    listChats
}