const { Router } = require("express");
const router = Router();

const { groupService } = require("../../core/service/group");

router.get("/", async (req, res) => {
  const data = await groupService.find();
  res.send(data);
});

router.get("/members", async (req, res) => {
  const data = await groupService.findGroupMembers();
  res.send(data);
});

router.get("/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const data = await groupService.getById(groupId);
  res.send(data);
});

module.exports = router;
