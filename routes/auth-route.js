const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signup", { user: req.user });
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  let { name, email, password } = req.body;
  // check data if already in db
  const emailExsit = await User.findOne({ email });
  if (emailExsit) return res.status(400).send("Email Exsit");
  const hash = await bcrypt.hash(password, 10);
  password = hash;
  let newUser = new User({ name, email, password });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ msg: "User Saved", saveObj: savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
// 使用 passport 與 google 溝通（使用者登入），並且獲得使用者的 profile

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = router;
