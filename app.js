require("dotenv").config();
const path = require("node:path");
const assetspath = path.join(__dirname, "Public");
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const port = process.env.port;
const passwordUtils = require("./Utilities/passwordUtils");
const mainRouter = require("./Routes/mainRouter");
const userRouter = require("./Routes/userRouter");
const pool = require("./db/pool");
const passport = require("passport");
require("./Auth/passport");

const app = express();
app.set("views, __dirname");
app.set("view engine", "ejs");
app.use(express.static(assetspath));
app.use(
	session({
		store: new pgSession({
			pool: pool,
			tableName: "session",
		}),
		secret: process.env.cookie_secret,
		resave: false,
		cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 },
	}),
);

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use(express.urlencoded({ extended: false }));
//passport config

app.use(passport.initialize());
app.use(passport.session());
app.use(mainRouter);
app.use(userRouter);
app.listen(port, () => console.log(`app running & listening on port ${port}`));
