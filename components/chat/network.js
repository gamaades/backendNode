const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.post("/", (req, res) => {
    controller.addChat(req.body.users)
        .then(newChat => {
            response.success(req, res, newChat, 201);
        })
        .catch(e => {
            response.error(req, res, "Error interno", 500, e);
        });
})

router.get("/:userId", (req, res) => {
    controller.listChats(req.params.userId)
        .then(chatList => {
            response.success(req, res, chatList, 200)
        })
        .catch(e => {
            response.error(req, res, "Error interno", 500, e);
        });
})

module.exports = router;