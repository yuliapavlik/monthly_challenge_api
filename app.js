let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
const bodyParser = require("body-parser");
let indexRouter = require("./routes/index");
let userRouter = require("./routes/user");
let user2Router = require("./routes/user2");
const InitiateMongoServer = require("./config/db");
// PORT
const PORT = process.env.PORT || 4000;

// Initiate Mongo Server
InitiateMongoServer();

let app = express();

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
app.use("/user", user2Router);

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

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

module.exports = app;
