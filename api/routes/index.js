const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const roomRoutes = require("./room");
const memberRoutes = require("./member");
const groupRoutes = require("./group");
const deskRoutes = require("./desk");
const partRoutes = require("./part");

router
  .use("/auth", authRoutes)
  .use("/rooms", roomRoutes)
  .use("/members", memberRoutes)
  .use("/groups", groupRoutes)
  .use("/desks", deskRoutes)
  .use("/parts", partRoutes);

module.exports = router;
