const { Router } = require("express");
const router = Router();

const { partService } = require("../../core/service/part");

router.get("/rooms/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const data = await partService.findPartByRoomId(roomId);
  res.send(data);
});

module.exports = router;
