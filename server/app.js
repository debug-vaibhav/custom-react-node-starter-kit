var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * SASS middleware not required
 */
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));
/**
 * This is just an API, HTML, CSS, JS won't be served from here
 */
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);

module.exports = app;
