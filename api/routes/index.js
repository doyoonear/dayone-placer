const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const roomRoutes = require("./room");
const memberRoutes = require("./member");
const groupRoutes = require("./group");

router
  .use("/auth", authRoutes)
  .use("/rooms", roomRoutes)
  .use("/members", memberRoutes)
  .use("/groups", groupRoutes);

module.exports = router;
