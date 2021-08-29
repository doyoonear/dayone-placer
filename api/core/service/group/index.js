const { groupRepository } = require("../../repository/groupRepository");
const { Service } = require("../Service");

const { memberService } = require("../member");

class GroupService extends Service {
  constructor() {
    super({ repository: groupRepository });
  }

  async findGroupMembers() {
    const data = await groupRepository.select();

    const groups = data.filter((item) => item.type === "LEVEL_1");

    const members = await memberService.find();

    groups.forEach((group) => {
      group.children = data.filter((item) => item.parent_id === group.id);
      group.children?.forEach((child) => {
        child.members = members.filter((member) => member.groupId === child.id); // TODO: knex 설정으로 snake => camel로 바꾸도록 수정
      });
    });

    return groups;
  }
}

module.exports = {
  groupService: new GroupService(),
};
