const { memberRepository } = require("../../repository/memberRepository");
const { Service } = require("../Service");

class MemberService extends Service {
  constructor() {
    super({ repository: memberRepository });
  }

  findAllGroupIds(groupIds) {
    return memberRepository.findAllGroupIds(groupIds);
  }
}

module.exports = {
  memberService: new MemberService(),
};
