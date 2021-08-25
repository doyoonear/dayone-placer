const memberService = require("../../service/member");
const deskService = require("../../service/desk");

const findDesks = (roomId) => {
  return [
    {
      id: 1,
      type: "RESERVED",
      memberId: 1,
      location: { x: 3, y: 6, rowspan: 2 },
    },
    {
      id: 2,
      type: "RESERVED",
      memberId: 2,
      location: { x: 4, y: 6, colspan: 2 },
    },
    {
      id: 3,
      type: "CONFIRMED",
      memberId: 3,
      location: { x: 6, y: 7, rowspan: 2 },
    },
    { id: 4, type: "EMPTY", location: { x: 1, y: 7, colspan: 2 } },
  ];
};

module.exports = {
  findDesks,
};
