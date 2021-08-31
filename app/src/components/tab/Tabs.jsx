import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabItem from './TabItem';
import { ACCOUNT_PERMISSION } from '../../common/policy';

function Tabs({ rooms, handleRoomModal, handleRoom, selectedRoom, accountLevel }) {
  const [visibleOptionModalData, setVisibleOptionModalData] = useState({});

  const handleOptionModal = (room, { x, y }) => {
    if (room.id === visibleOptionModalData.room?.id) {
      setVisibleOptionModalData({});
    } else {
      setVisibleOptionModalData({ room, x, y });
    }
  };

  const onClickOptionItem = (type, room) => {
    setVisibleOptionModalData({});
    handleRoomModal(type, room);
  };

  const closeOptionModalAndMoveRoom = (roomId) => {
    setVisibleOptionModalData({});
    handleRoom(roomId);
  };

  return (
    <TabsContainer>
      {accountLevel === ACCOUNT_PERMISSION.ALL && <TabAdd onClick={() => handleRoomModal('CREATE')}>+</TabAdd>}
      <TabItemContainer>
        {rooms.map((room) => (
          <TabItem
            key={room.id}
            room={room}
            handleRoom={closeOptionModalAndMoveRoom}
            selectedRoomId={selectedRoom.id}
            handleOptionModal={handleOptionModal}
            accountLevel={accountLevel}
          />
        ))}
        {visibleOptionModalData.room && (
          <OptionModal x={visibleOptionModalData.x} y={visibleOptionModalData.y}>
            <OptionModalItem onClick={() => onClickOptionItem('DELETE', visibleOptionModalData.room)}>
              <OptionModalItemTitle>삭제</OptionModalItemTitle>
            </OptionModalItem>
            <OptionModalItem onClick={() => onClickOptionItem('UPDATE', visibleOptionModalData.room)}>
              <OptionModalItemTitle>수정</OptionModalItemTitle>
            </OptionModalItem>
          </OptionModal>
        )}
      </TabItemContainer>
    </TabsContainer>
  );
}

Tabs.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRoomModal: PropTypes.func.isRequired,
  handleRoom: PropTypes.func.isRequired,
};

const OptionModal = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  bottom: ${(props) => window.innerHeight - props.y}px;
  border: 1px solid #ddd;
`;

const OptionModalItem = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 80px;
  height: 35px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const OptionModalItemTitle = styled.p`
  padding-left: 0.3rem;
  font-size: 1em;
`;

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
