const findGroups = () => {
  return [
    { id: 1, type: 'GROUP_1', name: '개발실' },
    { id: 2, type: 'GROUP_2', name: '플랫폼 개발팀', groupId: 1 },
  ];
};

module.epoxrts = {
  findGroups,
};
