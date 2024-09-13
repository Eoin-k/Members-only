const pool = require("./pool.js");

async function getAllMessages() {
	const messages = await pool.query(
		"SELECT messages.title, messages.post_content, users.firstname, users.lastname, users.is_admin, users.is_member FROM messages JOIN users ON messages.user_id = users.user_id;",
	);
	return messages.rows;
}

async function addNewUser(email, password, firstname, lastname) {
	try {
		await pool.query(
			"INSERT INTO users (email, firstname, lastname, password, is_member) VALUES ($1, $2, $3, $4, $5)",
			[email, firstname, lastname, password, "true"],
		);
	} catch (err) {
		console.error(err);
	}
}

async function addNewMessage(title, post_content, user_id) {
	await pool.query(
		"INSERT INTO messages (title, post_content, user_id) VALUES ($1, $2, $3)",
		[title, post_content, user_id],
	);
}

module.exports = {
	getAllMessages,
	addNewUser,
	addNewMessage,
};
