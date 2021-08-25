const findRooms = () => {
  return [{ id: 1, title: 'foo', sizeX: 30, sizeY: 30 }];
};

const getRooms = (roomId) => {
  return { id: 1, title: 'foo', sizeX: 30, sizeY: 30 };
};

module.exports = {
  findRooms,
  getRooms,
};
