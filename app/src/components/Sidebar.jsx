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
    console.log('children', children);
    // console.log('data', data[0].children);
    // setGroup(data);
  };

  useEffect(getGroupMembers, []);

  return (
    <StSidebar>
      {groupList.length &&
        groupList.map((group) => {
          return (
            // TODO: color 추가되면 group.id -> group.color 로 변경
            <StGroupContainer>
              <StGroupHeader groupColor={group.id}>
                <div>{group.title}</div>
              </StGroupHeader>
              <StMemberContainer>
                {group.members.length &&
                  group.members.map((member) => {
                    return <StMemberName>{member.name}</StMemberName>;
                  })}
              </StMemberContainer>
            </StGroupContainer>
          );
        })}
    </StSidebar>
  );
}
const StGroupContainer = styled.div`
  text-align: left;
  border: 0.1rem solid blue;
`;

const StMemberContainer = styled.li`
  background: '#e8e8e8';
  width: 100%;
`;

const StGroupHeader = styled.div`
  border-bottom: 0.1rem solid black;
  background: ${(props) => props.groupColor || 'grey'};
`;

const StMemberName = styled.div`
  color: black;
`;

const StSidebar = styled.div`
  padding: 1rem;
  width: 10rem;
  height: 100%;
`;

export default Sidebar;
