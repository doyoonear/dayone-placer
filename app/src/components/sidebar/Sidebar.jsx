import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../../store/Store';
import GroupHeader from './GroupHeader';
import { findGroupMembers } from '../../common/api/group';
import { handleGridColor } from '../../styles/theme';
import { DEFAULT_PART_LIST } from '../../common/policy';

function Sidebar({ roomId, handleDrag }) {
  const { state, dispatch } = useContext(Context);

  const createGroupColorMap = (data, result = {}) => {
    data.forEach((item) => {
      result[item.id] = item.color;
      if (item.children?.length) {
        createGroupColorMap(item.children, result);
      }
    });

    return result;
  };

  const getMotherGroup = async () => {
    const { data } = await findGroupMembers();

    dispatch({ type: 'SET_MOTHERGROUPS', value: data });

    const groupColors = createGroupColorMap(data);
    dispatch({ type: 'SET_GROUP_COLORS', value: groupColors });
  };

  const getGroupMembers = async (index) => {
    const groupMemberList = state.motherGroupList[index]?.children;

    const modifiedGroups = groupMemberList.map((group) => {
      return {
        ...group,
        isGroupOpen: false,
      };
    });
    dispatch({ type: 'SET_GROUPLIST', value: modifiedGroups });
  };

  useEffect(async () => {
    await getMotherGroup();
  }, []);

  return (
    <StSidebar key={`sidebar_${roomId}`}>
      <SidebarSubtitle>사물</SidebarSubtitle>
      <StGuideMessage>사물을 드래그해 그리드에 배치하세요.</StGuideMessage>
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
          <StPartTitle key={`partName${part.id}`}>{part.title}</StPartTitle>
        </StPartWrapper>
      ))}
      <SidebarSubtitle>임직원</SidebarSubtitle>
      <StGuideMessage>배치할 그룹을 선택하세요.</StGuideMessage>
      <StMotherGroupContainer>
        {state.motherGroupList.length > 0 &&
          state.motherGroupList.map((mGroup, index) => {
            return (
              <StMotherGroupBtn key={`motherBtn_${mGroup.id}`} onClick={() => getGroupMembers(index)}>
                {mGroup.title}
              </StMotherGroupBtn>
            );
          })}
      </StMotherGroupContainer>
      {state.groupList.length > 0 &&
        state.groupList.map((group) => {
          return (
            <>
              <StGroupHeader key={`header_${group.id}`} color={group.color}>
                <GroupHeader key={`group_${group.id}`} group={group} />
              </StGroupHeader>
              <StMemberContainer key={`members_${group.id}`} isGroupOpen={group.isGroupOpen}>
                {group.members.length > 0 &&
                  group.members?.map((member) => {
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
  padding-bottom: 0.8rem;
  margin-bottom: 1.2rem;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 5px solid ${(props) => props.theme.secondary2};

  :not(:first-child) {
    margin-top: 2.4rem;
  }
`;

const StGuideMessage = styled.p`
  font-size: 12px;
  font-weight: normal;
  color: ${(props) => props.theme.grey10};
  margin-bottom: 1.2rem;
`;

const StPartTitle = styled.span`
  margin-left: 8px;
  font-size: 12px;
  cursor: default;
`;

const StPartWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const StPart = styled.div`
  width: 48px;
  height: 32px;
  border: 0.3px solid ${(props) => props.theme.grey6};
  cursor: pointer;
  background: ${({ type, color }) => color ?? handleGridColor(type)};

  :hover {
    position: relative;
    bottom: 5px;
    right: 5px;
    transition: all 0.3s ease-out;
    box-shadow: 5px 3px 5px ${(props) => props.theme.secondary2};
  }
`;

const StMotherGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  width: 100%;
  margin-bottom: 1.2rem;
`;

const StMotherGroupBtn = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 0.2rem;
  background-color: ${(props) => props.color || 'white'};
  transition: all 0.2s ease-out;

  :hover {
    background: ${(props) => props.color || props.theme.grey0};
  }

  :active {
    background: ${(props) => props.color || props.theme.grey2};
  }
`;

const StGroupHeader = styled.div`
  margin-bottom: 0.4rem;
  padding: 0.7rem;
  border-radius: 0.2rem;
  background: ${(props) => props.color || props.theme.grey2};
  transition: all 0.2s ease-out;
  cursor: pointer;

  :hover {
    color: white;
  }
`;

const StMemberContainer = styled.li`
  display: ${(props) => (props.isGroupOpen ? 'block' : 'none')};
  width: 100%;
  margin-bottom: 1rem;
`;

const StMemberName = styled.div`
  padding: 0.7rem;
  font-size: 14px;
  background-color: ${(props) => props.theme.grey0};
  color: ${(props) => props.theme.grey10};
  transition: all 0.2s ease-out;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.secondary2};
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
