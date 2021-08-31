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
    sizeX: req.body.sizeX,
    sizeY: req.body.sizeY,
  };
  const result = await roomService.create(command);
  return res.send(result);
});

router.put("/:roomId", async (req, res) => {
  const id = Number(req.params.roomId);
  const command = {
    title: req.body.title,
    sizeX: req.body.sizeX,
    sizeY: req.body.sizeY,
  };
  const result = await roomService.updateById(id, command);
  return res.send(result);
});

router.delete("/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const result = await roomService.deleteById(roomId);
  return res.send(result);
});

module.exports = router;
