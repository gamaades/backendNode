const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.post("/", (req, res) => {
    controller.addUser(req.body.name)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(e => {
            response.error(req, res, "Informción invalida", 500, e);
        });
});

router.get("/", (req, res) => {
    const filterUsers = req.query.id || null;
    controller.getUsers(filterUsers)
        .then((userList) => {
            response.success(req, res, userList, 200)
        })
        .catch(e => {
            response.error(req, res, "Unexpected Error user", 500, e)
        })
})

router.delete("/:id", (req, res) => {
    controller.deleteUser(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario eliminado ${req.params.id} eliminado`)
        })
        .catch(e => {
            response.error(req, res, "Error interno", 500, e)
        })
})

module.exports = router;