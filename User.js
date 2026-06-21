
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  currency: { type: Number, default: 500 },
  stats: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    kills: { type: Number, default: 0 }
  },
  upgrades: {
    damage: { type: Number, default: 1 },
    health: { type: Number, default: 100 },
    speed: { type: Number, default: 5 }
  }
});

module.exports = require("mongoose").model("User", UserSchema);
