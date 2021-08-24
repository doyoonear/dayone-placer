const find = ({ roomId }) => {
  return [
    { id: 1, state: 'RESERVED', roomId: 1, memberId: 1, x: 5, y: 3 },
    { id: 2, state: 'CONFIRM', roomId: 1, memberId: 1, x: 5, y: 5 },
    { id: 3, state: 'CONFIRM', roomId: 1, memberId: 2, x: 6, y: 3 },
  ];
};

module.exports = {
  find,
};
