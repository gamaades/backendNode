const store = require("./store");

function addUser(name) {
    if (!name) {
        return Promise.reject("Nombre invalido"); // con esto retorna una promesa rechazada
    }
    const user = {
        name,
    };

    return store.add(user);
}

function getUsers(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("Parametro usuario invalido para eliminar");
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    })
}

module.exports = {
    addUser, getUsers, deleteUser
}