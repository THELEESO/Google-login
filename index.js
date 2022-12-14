const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
require("./config/psssport");
const profileRoute = require("./routes/profile-route");
// const cookieSession = require("cookie-session");
const passport = require("passport"); // 因為scope的關係 需定義才能執行 initialize, session
const session = require("express-session");
const flash = require("connect-flash");

// 到 mongodb atlas's cluster複製下來
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongoDB Atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.set("view engine", "ejs");
app.use(express.json());
// express已包含bodyParser，所以不需要，只需使用express
app.use(express.urlencoded({ extended: true }));
// app.use(cookieSession({ keys: [process.env.SECRET] }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// 當node.js server接收任何的 req 都會經過 middleware
// 並檢查有沒有來自 /auth 的 req，如果有就執行 authRoute
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.listen(8080, () => {
  console.log("Server running on port:8080.");
});
