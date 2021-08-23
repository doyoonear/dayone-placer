const memberService = require('../../service/member');
const deskService = require('../../service/desk');
const partService = require('../../service/part');

const findRoom = () => {
  return [
      { id:1, title: 'foo', sizeX: 30, sizeY : 30, sequence: 1 },
      { id:2, title: 'bar', sizeX: 30, sizeY : 30, sequence: 2 }
      ];
};

const getRoom = () => {
    const members = memberService.find();
    const desks = deskService.find({ roomId: 1 });

    members.forEach(member => {
        member.desks = desks.filter(desk => desk.memberId === member.id);
        member.group = memberService.findMemberGroupByMemberId(member.id);
    });

    const parts = partService.findParts({ roomId: 1 });

    return {members, parts}
};

module.exports = {
    findRoom,
    getRoom,
}
