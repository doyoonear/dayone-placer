const { Router } = require("express");
const router = Router();

const groupComponent = require("../../core/component/group");

router.get("/", (req, res) => {
  const data = groupComponent.findGroups();
  res.send(data);
});

router.get("/members", (req, res) => {
  const data = groupComponent.findGroupMembers();
  res.send(data);
});

router.get("/:groupId", (req, res) => {
  const groupId = req.params.groupId;
  const data = groupComponent.getGroup(groupId);
  res.send(data);
});

module.exports = router;
