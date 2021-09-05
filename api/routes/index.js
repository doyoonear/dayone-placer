const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const roomRoutes = require("./room");
const memberRoutes = require("./member");
const groupRoutes = require("./group");
const deskRoutes = require("./desk");
const partRoutes = require("./part");

router
  .use("/.api/auth", authRoutes)
  .use("/.api/rooms", roomRoutes)
  .use("/.api/members", memberRoutes)
  .use("/.api/groups", groupRoutes)
  .use("/.api/desks", deskRoutes)
  .use("/.api/parts", partRoutes);

module.exports = router;
