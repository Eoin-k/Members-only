const passwordUtils = require("../Utilities/passwordUtils");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateSignup = [
	body("email")
		.trim()
		.isEmail()
		.escape()
		.withMessage("Please enter a valid email"),
	body("firstname")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("First name must be longer than 2 characters"),
	body("lastname")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Last name must be longer than 2 characters"),
	body("password")
		.trim()
		.escape()
		.isLength({ min: 3 })
		.withMessage("Password must be longer than 3 characters"),
];

showRegistration = async (req, res) => {
	try {
		res.render("signup", {
			user: req.user,
		});
	} catch (err) {
		console.error(err);
	}
};

registerUser = [
	validateSignup,
	async (req, res) => {
		try {
			const errors = await validationResult(req);
			console.log("shit");
			if (!errors.isEmpty()) {
				return res.status(400).render("signup", {
					user: req.user,
					errors: errors.array(),
				});
			}
			const password = req.body.password;
			const email = req.body.email;
			const firstname = req.body.firstname;
			const lastname = req.body.lastname;
			const hashedpassword = await passwordUtils.generatePassword(password);
			await db.addNewUser(email, hashedpassword, firstname, lastname);
			res.redirect("/");
		} catch (err) {
			console.error(err);
		}
	},
];

module.exports = {
	showRegistration,
	registerUser,
};
