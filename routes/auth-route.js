const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
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
