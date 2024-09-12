const passwordUtils = require("../Utilities/passwordUtils");
const db = require("../db/queries");
showRegistration = async (req, res) => {
	try {
		res.render("signup");
	} catch (err) {
		console.error(err);
	}
};

registerUser = async (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	try {
		const hashedpassword = await passwordUtils.generatePassword(password);
		await db.addNewUser(email, hashedpassword, firstname, lastname);
		res.redirect("/");
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	showRegistration,
	registerUser,
};
