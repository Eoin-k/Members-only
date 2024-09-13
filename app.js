require("dotenv").config();
const path = require("node:path");
const assetspath = path.join(__dirname, "Public");
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const port = process.env.port;
const mainRouter = require("./Routes/messageRouter");
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

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(mainRouter);
app.use(userRouter);
app.listen(port, () => console.log(`app running & listening on port ${port}`));
