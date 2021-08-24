const memberService = require('../../service/member');
const deskService = require('../../service/desk');

const findMembers = () => {
  return memberService.find();
};

const getMembers = (memberId) => {
  return memberService.get(memberId);
};

const findRoomMembers = () => {
  const members = memberService.find();
  const desks = deskService.find({ roomId: 1 });

  return members.map((member) => {
    member.desks = desks.filter((desk) => desk.memberId === member.id);
    member.group = memberService.findMemberGroupByMemberId(member.id);
    return member;
  });
};

module.exports = {
  findMembers,
  getMembers,
  findRoomMembers,
};
