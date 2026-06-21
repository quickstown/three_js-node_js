
const router = require("express").Router();
const auth = require("../utils/authMiddleware");
const User = require("../models/User");

router.post("/buy", auth, async (req,res)=>{
  const { item } = req.body;

  const user = await User.findById(req.user.id);

  if(item === "speed" && user.currency >= 150){
    user.currency -= 150;
    user.upgrades.speed += 1;
  }

  if(item === "damage" && user.currency >= 200){
    user.currency -= 200;
    user.upgrades.damage += 1;
  }

  await user.save();
  res.json(user);
});

module.exports = router;
