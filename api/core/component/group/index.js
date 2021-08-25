const findGroups = () => {
  return [
    {
      id: 1,
      type: "LEVEL_1",
      title: "개발실",
      sequence: 1,
      children: [
        { id: 2, type: "LEVEL2", title: "패캠", sequence: 1 },
        { id: 3, type: "LEVEL2", title: "스노우볼", sequence: 2 },
        { id: 4, type: "LEVEL2", title: "콜로소", sequence: 3 },
      ],
    },
  ];
};

const getGroup = (id) => {
  return {
    id: 1,
    type: "LEVEL_1",
    title: "개발실",
    sequence: 1,
  };
};

const findGroupMembers = () => {
  return [
    {
      id: 1,
      type: "LEVEL_1",
      title: "개발실",
      sequence: 1,
      children: [
        {
          id: 2,
          type: "LEVEL2",
          title: "패캠",
          sequence: 1,
          members: [{ id: 1, name: "홍길동", groupId: 2 }],
        },
        {
          id: 3,
          type: "LEVEL2",
          title: "스노우볼",
          sequence: 2,
          members: [{ id: 2, name: "철수", groupId: 3 }],
        },
        {
          id: 4,
          type: "LEVEL2",
          title: "콜로소",
          sequence: 3,
          members: [{ id: 3, name: "영희", groupId: 4 }],
        },
      ],
    },
  ];
};

module.exports = {
  findGroups,
  getGroup,
  findGroupMembers,
};