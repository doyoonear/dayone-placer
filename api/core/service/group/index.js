const { groupRepository } = require("../../repository/groupRepository");
const { Service } = require("../Service");

const { memberService } = require("../member");

class GroupService extends Service {
  constructor() {
    super({ repository: groupRepository });
  }

  async findGroupMembers() {
    const groups = await groupRepository.selectAll({ type: "LEVEL_2" });
    const groupIds = groups.map((item) => item.id);

    const members = await memberService.findAllGroupIds(groupIds);

    return groups.map((group) => {
      group.children = members.filter((member) => member.groupId === group.id);
      return group;
    });
  }
}

module.exports = {
  groupService: new GroupService(),
};
