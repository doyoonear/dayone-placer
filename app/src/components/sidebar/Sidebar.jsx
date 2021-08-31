import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../../store/Store';
import GroupHeader from './GroupHeader';
import { findGroupMembers } from '../../common/api/group';
import { handleGridColor } from '../../styles/theme';
import { DEFAULT_PART_LIST } from '../../common/policy';

function Sidebar({ handleDrag }) {
  const { state, dispatch } = useContext(Context);

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
      <SidebarSubtitle>사물</SidebarSubtitle>
      {DEFAULT_PART_LIST.map((part) => (
        <StPartWrapper key={`partwrapper_${part.id}`}>
          <StPart
            key={`part_${part.id}`}
            draggable
            type={part.type}
            color={part.color}
            data-type={part.type}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => handleDrag(e, part)}
          />
          <StName key={`partName${part.id}`}>{part.title}</StName>
        </StPartWrapper>
      ))}
      <SidebarSubtitle>임직원</SidebarSubtitle>
      {state.groupList?.length &&
        state.groupList?.map((group) => {
          return (
            <>
              <StGroupHeader key={`header_${group.id}`} color={group.color}>
                <GroupHeader key={`group_${group.id}`} group={group} />
              </StGroupHeader>
              <StMemberContainer key={`members_${group.id}`} isGroupOpen={group.isGroupOpen}>
                {group.members.length &&
                  group.members.map((member) => {
                    return (
                      <StMemberName
                        key={`memberName_${member.id}`}
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
            </>
          );
        })}
    </StSidebar>
  );
}

Sidebar.propTypes = {
  handleDrag: PropTypes.func,
};

Sidebar.defaultProps = {
  handleDrag: () => {},
};

const SidebarSubtitle = styled.p`
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
  background: ${({ type, color }) => color ?? handleGridColor(type)};
`;

const StGroupHeader = styled.div`
  padding: 0.7rem;
  background: ${(props) => props.color || 'grey'};
`;

const StMemberContainer = styled.li`
  display: ${(props) => (props.isGroupOpen ? 'block' : 'none')};
  width: 100%;
`;

const StMemberName = styled.div`
  color: #262626;
  padding: 0.7rem;
  background-color: ${(props) => props.theme.primary2};
  :hover {
    background-color: ${(props) => props.theme.primary6};
  }
`;

const StSidebar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  padding: 20px 20px 60px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  background: ${(props) => props.theme.primary4};
  overflow-y: auto;
`;

export default Sidebar;
