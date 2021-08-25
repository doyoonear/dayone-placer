const { Router } = require("express");
const router = Router();

const deskComponent = require("../../core/component/desk");

router.get("/:roomId", (req, res) => {
  const roomId = req.query.roomId;
  const data = deskComponent.findDesks(roomId);
  res.send(data);
});

module.exports = router;
