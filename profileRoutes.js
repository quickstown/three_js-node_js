
const router = require("express").Router();
const auth = require("../utils/authMiddleware");
const User = require("../models/User");

router.get("/", auth, async (req,res)=>{
  const user = await User.findById(req.user.id).select("-passwordHash");
  res.json(user);
});

module.exports = router;
