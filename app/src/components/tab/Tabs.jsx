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
      </TabItemContainer>
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
    </TabsContainer>
  );
}

Tabs.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRoomModal: PropTypes.func.isRequired,
  handleRoom: PropTypes.func.isRequired,
};

const OptionModal = styled.div`
  width: 100px;
  position: absolute;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.grey0};
  left: ${(props) => props.x}px;
  bottom: ${(props) => window.innerHeight - props.y}px;
  margin-bottom: 0.6rem;
  box-shadow: 10px 15px 25px ${(props) => props.theme.grey2};
`;

const OptionModalItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  border-bottom: 0.3px solid ${(props) => props.theme.grey6};
  background-color: ${(props) => props.theme.secondary2};
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.primary4};
  }
`;

const OptionModalItemTitle = styled.p`
  padding-left: 0.3rem;
  font-size: 12px;
`;

const TabsContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.grey8};
`;

const TabItemContainer = styled.div`
  z-index: 20;
  display: flex;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TabAdd = styled.button`
  font-size: 16px;
  padding: 0px 20px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.primary8};
  cursor: pointer;
`;

export default Tabs;
