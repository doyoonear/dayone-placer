const find = () => {
  return [
    { id: 1, type: 'MEMBER', level: 20, name: '홍길동' },
    { id: 2, type: 'MEMBER', level: 20, name: '철수' },
  ];
};

const get = (id) => {
  return { id: 2, type: 'MEMBER', level: 20, name: '철수' };
};

const findMemberGroupByMemberId = (memberId) => {
  if (memberId === 1) {
    return { id: 1, memberId: 1, groupId: 2, level: 20 };
  }

  return { id: 2, memberId: 2, groupId: 2, level: 30 };
};

module.exports = {
  find,
  get,
  findMemberGroupByMemberId,
};
