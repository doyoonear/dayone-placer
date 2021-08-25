const memberService = require("../../service/member");
const deskService = require("../../service/desk");

const findParts = (roomId) => {
  return [
    { id: 1, type: "WINDOW", direction: 3, location: { x: 3, y: 6 } },
    { id: 2, type: "WINDOW", direction: 3, location: { x: 3, y: 7 } },
    { id: 3, type: "WINDOW", direction: 3, location: { x: 3, y: 8 } },
    { id: 4, type: "DOOR", direction: 3, location: { x: 20, y: 15 } },
  ];
};

module.exports = {
  findParts,
};
