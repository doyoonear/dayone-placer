import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Tabs({ rooms, handleRoomModal, handleRoom }) {
  return (
    <TabsContainer>
      {rooms.map((room) => (
        <Tab key={room.id} id={room.id} onClick={() => handleRoom(room.id)}>
          {room.title}
        </Tab>
      ))}
      <Tab onClick={handleRoomModal} addRoom>
        방 추가
      </Tab>
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

const Tab = styled.button`
  width: 100px;
  font-size: 16px;
  background: ${(props) => (props.addRoom ? props.theme.primary6 : props.theme.primary4)};
  border-right: 1px solid lightgray;
  cursor: pointer;
`;

export default Tabs;
