import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '../icons/DeleteIcon';

const TabItem = ({ room, handleRoom, handleRoomDeleteModal, selectedRoomId }) => {
  console.log('selectedRoomId', selectedRoomId);
  return (
    <TabContainer id={room.id} selectedRoomId={selectedRoomId}>
      <TabTitle key={room.id} id={room.id} onClick={() => handleRoom(room.id)}>
        {room.title}
      </TabTitle>
      <TabArrow onClick={() => handleRoomDeleteModal(room)}>
        <DeleteIcon width={0.8} height={0.8} rotate={0} />
      </TabArrow>
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
