const { Router } = require("express");
const router = Router();

const deskService = require("../../core/service/desk");

router.get("/:roomId", (req, res) => {
  const roomId = req.query.roomId;
  const data = deskService.findAllByRoomId(roomId);
  res.send(data);
});

module.exports = router;
