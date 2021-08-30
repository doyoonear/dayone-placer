import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../../store/Store';
import GroupHeader from './GroupHeader';
import { findGroupMembers } from '../../common/api/group';
import { handleGridColor } from '../../styles/theme';

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
    } = await findGroupMembers();

    const modifiedGroups = children.map((group) => {
      return {
        ...group,
        isGroupOpen: false,
      };
    });

    dispatch({ type: 'SET_GROUPLIST', value: modifiedGroups });
  };

  useEffect(getGroupMembers, []);

  return (
    <StSidebar>
      <SidebarSubitle>사물</SidebarSubitle>
      {partList.map((part) => (
        <StPartWrapper>
          <StPart
            key={part.id}
            draggable
            type={part.type}
            data-type={part.type}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => handleDrag(e, part)}
          />
          <StName>{part.title}</StName>
        </StPartWrapper>
      ))}
      <SidebarSubitle>임직원</SidebarSubitle>
      {state.groupList.length &&
        state.groupList.map((group) => {
          return (
            <div key={group.id}>
              <StGroupHeader color={group.color}>
                <GroupHeader group={group} />
              </StGroupHeader>
              <StMemberContainer isGroupOpen={group.isGroupOpen}>
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

const SidebarSubitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 20px;

  :not(:first-child) {
    margin-top: 20px;
  }
`;

const StName = styled.span`
  margin-left: 8px;
  font-size: 12px;
`;

const StPartWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

const StPart = styled.div`
  width: 48px;
  height: 32px;
  border: 1px solid lightgrey;
  cursor: pointer;
  background: ${({ type }) => handleGridColor(type)};
`;

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
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  background: ${(props) => props.theme.primary4};
`;

export default Sidebar;
