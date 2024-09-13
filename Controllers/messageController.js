const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateMessage = [
	body("title")
		.trim()
		.escape()
		.isLength({ min: 3 })
		.withMessage("Title must be longer than 3 characters"),
	body("post_content")
		.trim()
		.escape()
		.isLength({ min: 5 })
		.withMessage("Post content must be longer than 5 characters"),
];

showHome = async (req, res) => {
	try {
		const messages = await db.getAllMessages();
		await res.render("index", {
			user: req.user,
			messages: messages,
		});
	} catch (err) {
		console.error(err);
	}
};

createMessage = [
	validateMessage,
	async (req, res) => {
		const title = req.body.title;
		const postContent = req.body.post_content;
		const userId = req.user.user_id;
		const messages = await db.getAllMessages();
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).render("index", {
					user: req.user,
					errors: errors.array(),
					messages: messages,
				});
			}
			await db.addNewMessage(title, postContent, userId);
			res.redirect("/");
		} catch (err) {}
	},
];

deleteMessage = async (req, res) => {
	try {
		const user = req.user || "";
		const id = req.params.id;
		if (user.is_admin) {
			await db.deleteMessage(id);
			res.redirect("/");
		} else {
			console.log("No delete permission");
			res.redirect("/");
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	showHome,
	createMessage,
	deleteMessage,
};
