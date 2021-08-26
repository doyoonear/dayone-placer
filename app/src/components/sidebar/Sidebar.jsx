import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import httpClient from '../../api/http-client';
import ArrowIcon from './icons/ArrowIcon';

function Sidebar({ handleDrag }) {
  const [groupList, setGroupList] = useState([]);
  const [partList, setPartList] = useState([
    { id: 1, type: 'DESK', title: '책상' },
    { id: 2, type: 'WINDOW_1', title: '창문1' },
  ]);

  const getGroupMembers = async () => {
    const {
      data: [{ children }],
    } = await httpClient.get({ url: '/groups/members' });

    setGroupList(children);
  };

  useEffect(getGroupMembers, []);
  useEffect(() => console.log('groupList', groupList));

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
      {groupList.length &&
        groupList.map((group) => {
          return (
            <StGroupContainer key={group.id}>
              <StGroupHeader color={group.color}>
                <StFlexBox justify='space-between'>
                  <h3>{group.title}</h3>
                  <ArrowIcon width='1' height='1' rotate='90' />
                </StFlexBox>
              </StGroupHeader>
              <StMemberContainer>
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
            </StGroupContainer>
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

const StPartContainer = styled.div``;
const StPart = styled.div``;

const StGroupContainer = styled.div`
  border: 0.1rem solid red;
`;

const StGroupHeader = styled.div`
  padding: 0.7rem;
  border-bottom: 0.1rem solid black;
  background: ${(props) => props.color || 'grey'};
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

const StFlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  flex-direction: ${(props) => props.direction || 'row'};
`;

export default Sidebar;
