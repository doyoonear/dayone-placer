import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabItem from './TabItem';
import { ACCOUNT_PERMISSION } from '../../common/policy';

function Tabs({ rooms, handleRoomModal, handleRoom, handleRoomDeleteModal, selectedRoom, accountLevel }) {
  return (
    <TabsContainer>
      {accountLevel === ACCOUNT_PERMISSION.ALL && <TabAdd onClick={handleRoomModal}>+</TabAdd>}
      <TabItemContainer>
        {rooms.map((room) => (
          <TabItem
            key={room.id}
            room={room}
            handleRoom={handleRoom}
            handleRoomDeleteModal={handleRoomDeleteModal}
            selectedRoomId={selectedRoom.id}
            accountLevel={accountLevel}
          />
        ))}
      </TabItemContainer>
    </TabsContainer>
  );
}

Tabs.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRoomModal: PropTypes.func.isRequired,
  handleRoom: PropTypes.func.isRequired,
};

const TabsContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: ${(props) => props.theme.primary2};
`;

const TabItemContainer = styled.div`
  display: flex;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TabAdd = styled.button`
  font-size: 16px;
  padding: 0px 10px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.primary6};
`;

export default Tabs;
