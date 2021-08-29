import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../../store/Store';
import GroupHeader from './GroupHeader';
import httpClient from '../../api/http-client';

function Sidebar({ handleDrag, handleDrop }) {
  const { state, dispatch } = useContext(Context);
  const [partList, setPartList] = useState([
    { id: 1, type: 'DESK', title: '책상' },
    { id: 2, type: 'WINDOW_1', title: '창문1' },
  ]);
  // const [isGroupOpen, setIsGroupOpen] = useState(true);
  // const [groupList, setGroupList] = useState([]);

  const getGroupMembers = async () => {
    const {
      data: [{ children }],
    } = await httpClient.get({ url: '/groups/members' });

    dispatch({ type: 'SET_GROUPLIST', value: children });
  };

  useEffect(getGroupMembers, []);

  return (
    <StSidebar>
      <StPartContainer>
        {partList.map((part) => (
          <StPart
            key={part.id}
            draggable
            data-type={part.type}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={handleDrag}
          >
            {part.title}
          </StPart>
        ))}
      </StPartContainer>
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
                    return (
                      <StMemberName
                        key={member.id}
                        draggable
                        data-type='MEMBER'
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={(e) => handleDrag(e, member)}
                      >
                        {member.name}
                      </StMemberName>
                    );
                  })}
              </StMemberContainer>
            </div>
          );
        })}
    </StSidebar>
  );
}

Sidebar.propTypes = {
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
};

Sidebar.defaultProps = {
  handleDrag: () => {},
  handleDrop: () => {},
};

const StPartContainer = styled.div``;
const StPart = styled.div``;

const StGroupHeader = styled.div`
  padding: 0.7rem;
  background: ${(props) => props.color || 'grey'};
`;

const StMemberContainer = styled.li`
  padding: 0.7rem;
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
