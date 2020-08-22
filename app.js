var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var testAPIRouter = require("./routes/testAPI");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
