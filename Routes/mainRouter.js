const { Router } = require("express");
const mainController = require("../Controllers/mainController");
const mainRouter = Router();

mainRouter.get("/", mainController.showHome);

module.exports = mainRouter;
