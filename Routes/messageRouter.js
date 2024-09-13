const { Router } = require("express");
const messageController = require("../Controllers/messageController");
const messageRouter = Router();

messageRouter.get("/", messageController.showHome);
messageRouter.post("/createmessage", messageController.createMessage);
module.exports = messageRouter;
