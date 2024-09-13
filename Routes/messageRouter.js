const { Router } = require("express");
const messageController = require("../Controllers/messageController");
const messageRouter = Router();

messageRouter.get("/", messageController.showHome);
messageRouter.get("/deletepost/:id", messageController.deleteMessage);
messageRouter.post("/createmessage", messageController.createMessage);
module.exports = messageRouter;
