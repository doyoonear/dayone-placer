import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { store, useStore, StateProvider } from '../store/Store';
import GroupHeader from './sidebar/GroupHeader';

function Sidebar() {
  const state = useStore(store);
  const { dispatch } = StateProvider;

  // const [isGroupOpen, setIsGroupOpen] = useState(true);
  // const [groupList, setGroupList] = useState([]);

  // const GroupMembersContext = React.createContext({
  //   isGroupOpen,
  //   setIsGroupOpen,
  //   groupList,
  //   setGroupList,
  // });

  // const { groupList, isGroupOpen, setGroupList } = state;

  // const groupMembers = useContext(GroupMembersContext);

  const getGroupMembers = async () => {
    const {
      data: [{ children }],
    } = await axios.get('http://localhost:4000/groups/members');

    dispatch({ type: 'SET_GROUPLIST', value: children });
  };

  useEffect(getGroupMembers, []);

  return (
    <StSidebar>
      {state.groupList.length &&
        state.groupList.map((group) => {
          return (
            <div key={group.id}>
              <StGroupHeader color={group.color}>
                <GroupHeader group={group} />
              </StGroupHeader>
              <StMemberContainer isGroupOpen={state.isGroupOpen}>
                {group.members.length &&
                  group.members.map((member) => {
                    return <StMemberName key={member.id}>{member.name}</StMemberName>;
                  })}
              </StMemberContainer>
            </div>
          );
        })}
    </StSidebar>
  );
}

const StGroupHeader = styled.div`
  padding: 0.7rem;
  background: ${(props) => props.color || 'grey'};
`;

const StMemberContainer = styled.li`
  padding: 0.7rem;
  /* background: ${(props) => (props.isGroupOpen ? 'blue' : props.theme.primary4)}; */
  display: ${(props) => (props.isGroupOpen ? 'block' : 'none')};
  width: 100%;
`;

const StMemberName = styled.div`
  color: black;
`;

const StSidebar = styled.div`
  background: ${(props) => props.theme.primary6};
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  width: 15rem;
`;

export default Sidebar;
