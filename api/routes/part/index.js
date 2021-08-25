const { Router } = require("express");
const router = Router();

const partComponent = require("../../core/component/part");

router.get("/:roomId", (req, res) => {
  const roomId = req.query.roomId;
  const data = partComponent.findParts(roomId);
  res.send(data);
});

module.exports = router;
