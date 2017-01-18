var express = require("express");
var app = express();
var path = require("path");
var exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require("body-parser");
var passport = require("passport");

require("./passport-init");

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// app.use(require("./routes/logging.js"));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'abra-kadabra',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

var authRouter = require("./routes/auth");
app.use(authRouter);

app.use(function (req, res, next) {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
		next();
		return;
	}
	res.redirect("/login");
});

app.get('/', function (req, res) {
	res.render("home", { title: "Home" });
});

var adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

var apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.listen(3000, function () {
	console.log('Online-App listening on port 3000!');
});