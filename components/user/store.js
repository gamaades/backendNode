const Model = require("./model");

function addUser(user) {
    const myUser = new Model(user);
    return myUser.save(); // devuelve una promesa
}

async function getUser(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {id: filterUser}
    }
    const users = await Model.find(filter);    
    return users;
}

function removeUser(id) {
    return Model.findByIdAndDelete(id); // tambien se puede utlizar este metodo
}

module.exports = {
    add: addUser,
    list: getUser,
    remove: removeUser
}