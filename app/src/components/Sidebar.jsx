import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Sidebar() {
  const [groupList, setGroupList] = useState([]);

  const getGroupMembers = async () => {
    const {
      data: [{ children }],
    } = await axios.get('http://localhost:4000/groups/members');

    setGroupList(children);
  };

  useEffect(getGroupMembers, []);

  return (
    <StSidebar>
      {groupList.length &&
        groupList.map((group) => {
          return (
            // TODO: color 추가되면 group.id -> group.color 로 변경
            <StGroupContainer key={group.id}>
              <StGroupHeader groupColor={group.id}>
                <div>{group.title}</div>
              </StGroupHeader>
              <StMemberContainer>
                {group.members.length &&
                  group.members.map((member) => {
                    return <StMemberName key={member.id}>{member.name}</StMemberName>;
                  })}
              </StMemberContainer>
            </StGroupContainer>
          );
        })}
    </StSidebar>
  );
}
const StGroupContainer = styled.div`
  border: 0.1rem solid red;
`;

const StGroupHeader = styled.div`
  padding: 0.7rem;
  border-bottom: 0.1rem solid black;
  background: ${(props) => props.groupColor || 'grey'};
`;

const StMemberContainer = styled.li`
  padding: 0.7rem;
  background: #e8e8e8;
  width: 100%;
`;

const StMemberName = styled.div`
  color: black;
`;

const StSidebar = styled.div`
  background: papayawhip;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  width: 15rem;
`;

export default Sidebar;
