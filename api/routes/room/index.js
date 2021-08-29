const { Router } = require("express");
const router = Router();

const { roomService } = require("../../core/service/room");

router.get("/", async (req, res) => {
  const data = await roomService.find();
  return res.send(data);
});

router.get("/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const data = await roomService.getById(roomId);
  return res.send(data);
});

module.exports = router;
