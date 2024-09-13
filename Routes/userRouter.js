const { Router } = require("express");
const userRouter = Router();
const loginController = require("../Controllers/loginController");
const signupController = require("../Controllers/signupController");
const passport = require("passport");
require("../Auth/passport");

userRouter.get("/login", loginController.showLogin);
userRouter.get("/sign-up", signupController.showRegistration);
userRouter.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
	});
	res.redirect("/");
});

userRouter.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "login",
	}),
	(callback = (req, res) => {
		res.redirect("/login");
	}),
);
userRouter.post("/sign-up", signupController.registerUser);

module.exports = userRouter;
