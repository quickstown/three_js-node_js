
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/auth");

router.post("/register", async (req,res)=>{
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password,10);

  const user = await User.create({ username, passwordHash: hash });
  const token = generateToken(user);

  res.json({ user, token });
});

router.post("/login", async (req,res)=>{
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if(!user) return res.status(400).json({error:"not found"});

  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({error:"wrong password"});

  const token = generateToken(user);
  res.json({ user, token });
});

module.exports = router;
