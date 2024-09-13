const db = require("../db/queries");
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

createMessage = async (req, res) => {
	const title = req.body.title;
	const postContent = req.body.post_content;
	const userId = req.user.user_id;
	try {
		await db.addNewMessage(title, postContent, userId);
		res.redirect("/");
	} catch (err) {}
};

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
