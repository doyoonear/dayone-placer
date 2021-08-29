const { Router } = require("express");
const router = Router();

const memberService = require("../../core/service/member");

router.get("/", (req, res) => {
  const data = memberService.find();
  res.send(data);
});

router.get("/:memberId", (req, res) => {
  const memberId = req.params.memberId;
  const data = memberService.getById(memberId);
  res.send(data);
});

module.exports = router;
