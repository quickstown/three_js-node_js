
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const gameSocket = require("./sockets/gameSocket");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const shopRoutes = require("./routes/shopRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/shop", shopRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

gameSocket(io);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
