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

router.post("/", async (req, res) => {
  const command = {
    title: req.body.title,
    size_x: req.body.sizeX,
    size_y: req.body.sizeY,
  };
  const result = await roomService.create(command);
  return res.send(result);
});

router.delete("/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const result = await roomService.deleteById(roomId);
  return res.send(result);
});

module.exports = router;
