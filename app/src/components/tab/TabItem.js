import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../icons/ArrowIcon';
import { ACCOUNT_PERMISSION } from '../../common/policy';

const TabItem = ({ room, handleRoom, selectedRoomId, handleOptionModal, accountLevel }) => {
  const tabContainer = useRef();

  return (
    <TabContainer id={room.id} selectedRoomId={selectedRoomId} ref={tabContainer}>
      <TabTitle key={room.id} id={room.id} onClick={() => handleRoom(room.id)} accountLevel={accountLevel}>
        {room.title}
      </TabTitle>
      {accountLevel === ACCOUNT_PERMISSION.ALL && (
        <TabArrow onClick={() => handleOptionModal(room, tabContainer.current.getBoundingClientRect())}>
          <ArrowIcon width={0.8} height={0.8} rotate={90} />
        </TabArrow>
      }
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  cursor: pointer;
  background: ${(props) => (props.id === props.selectedRoomId ? props.theme.primary6 : props.theme.primary4)};

  :hover {
    background: ${(props) => props.theme.primary6};
  }
`;

const TabTitle = styled.button`
  font-size: 13px;
  padding-left: 15px;
  padding-right: 15px;
  border-right: ${(props) => (Number(props.accountLevel) === ACCOUNT_PERMISSION.ALL ? 'none;' : '1px solid lightgray;')}
  align-items: center;
  justify-contents: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TabArrow = styled.button`
  border-right: 1px solid lightgray;
  padding-right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export default TabItem;
