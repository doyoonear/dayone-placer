import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteIcon from './icons/DeleteIcon';

function Tabs({ rooms, handleRoomModal, handleRoom, handleRoomDeleteModal }) {
  return (
    <TabsContainer>
      <TabAdd onClick={handleRoomModal}>+</TabAdd>

      <RoomsContainer>
        {rooms.map((room) => (
          <TabContainer>
            <TabTitle key={room.id} id={room.id} onClick={() => handleRoom(room.id)}>
              {room.title}
            </TabTitle>
            <TabArrow onClick={() => handleRoomDeleteModal(room)}>
              <DeleteIcon width={0.8} height={0.8} rotate={0} />
            </TabArrow>
          </TabContainer>
        ))}
      </RoomsContainer>
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

const RoomsContainer = styled.div`
  display: flex;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  cursor: pointer;
  background: ${(props) => props.theme.primary4};

  :hover {
    background: ${(props) => props.theme.primary6};
  }
`;

const TabAdd = styled.button`
  font-size: 16px;
  padding: 0px 10px;
  align-items: center;
  justify-contents: center;
  background: ${(props) => props.theme.primary6};
`;

const TabTitle = styled.button`
  font-size: 16px;
  padding-left: 20px;
  align-items: center;
  justify-contents: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TabArrow = styled.button`
  border-right: 1px solid lightgray;
  padding-right: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export default Tabs;
