const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const passwordUtils = require("../Utilities/passwordUtils");

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		async (email, password, done) => {
			try {
				const { rows } = await pool.query(
					"SELECT * FROM users WHERE email = $1",
					[email],
				);
				const user = rows[0];
				const match = passwordUtils.checkPassword(password, user.password);
				if (!user) {
					return done(null, false, { message: "incorrect email" });
				}
				if (!match) {
					return done(null, false, { message: "Password is incorrect" });
				}
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query(
			"SELECT * FROM users WHERE user_id = $1",
			[id],
		);
		const user = rows[0];
		done(null, user);
	} catch (err) {
		done(err);
	}
});
