const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong credentials");

    const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const passwordDecrypt = hashedPass.toString(CryptoJS.enc.Utf8);
    passwordDecrypt !== req.body.password &&
      res.status(401).json("wrong credentials");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
