const db = require("../db/queries");
showHome = async (req, res) => {
	try {
		const messages = await db.getAllMessages();
		console.log(req.user);
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

module.exports = {
	showHome,
	createMessage,
};
