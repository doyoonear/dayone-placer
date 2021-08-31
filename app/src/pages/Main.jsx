import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Grid from '../components/grid/Grid.jsx';
import Tabs from '../components/tab/Tabs';
import InfoModal from '../components/modal/InfoModal';
import RoomCreateModal from '../components/modal/RoomCreateModal';
import RoomDeleteModal from '../components/modal/RoomDeleteModal';
import RoomUpdateModal from '../components/modal/RoomUpdateModal';
import DeskCreateModal from '../components/modal/DeskCreateModal';

import socketConnection from '../common/api/socket';
import { getStorage } from '../common/support/storage';
import { findGroups } from '../common/api/group';
import { findRooms, createRoom, apiDeleteRoom, apiUpdateRoom } from '../common/api/room';

function Main() {
  const history = useHistory();
  const [accountLevel, setAccountLevel] = useState(0);
  const [isDeskModalOn, setIsDeskModalOn] = useState(false);
  const [isRoomModalOn, setIsRoomModalOn] = useState(false);
  const [roomDeleteData, setRoomDeleteData] = useState({});
  const [roomUpdateData, setRoomUpdateData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [groups, setGroups] = useState([]);
  const [deskForm, setDeskForm] = useState({
    team: '',
    x: 0,
    y: 0,
  });

  const [isInfoModalVisible, setInfoModal] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');

  const showInfoModal = (message) => {
    setInfoModalTitle(message);
    setInfoModal(true);
  };

  const hideInfoModal = () => {
    setInfoModalTitle('');
    setInfoModal(false);
  };

  const fetchRooms = () => {
    findRooms().then((result) => {
      setRooms(result.data);
    });
  };

  const fetchGroups = () => {
    findGroups().then((result) => {
      setGroups(result.data);
    });
  };

  const fetchData = () => {
    fetchRooms();
    fetchGroups();
  };

  const deleteRoom = () => {
    try {
      apiDeleteRoom(roomDeleteData.id).then(() => {
        setRoomDeleteData({});

        fetchRooms();
      });
    } catch {
      setInfoModal(false);
    }
  };

  const makeNewRoom = (room) => {
    if (room.title.length === 0) {
      showInfoModal('공간 명을 입력해주세요.');
      return;
    }

    if (room.sizeX < 10) {
      showInfoModal('가로길이는 최소 10보다 크게 지정해주세요.');
      return;
    }

    if (room.sizeY < 10) {
      showInfoModal('세로길이는 최소 10보다 크게 지정해주세요.');
      return;
    }

    try {
      createRoom(room).then(() => {
        setIsRoomModalOn(false);
        setInfoModal(true);

        fetchRooms();
      });
    } catch {
      setInfoModal(false);
    }
  };

  const updateRoom = ({ id, data }) => {
    if (data.title.length === 0) {
      showInfoModal('공간 명을 입력해주세요.');
      return;
    }

    if (data.sizeX < 10) {
      showInfoModal('가로길이는 최소 10보다 크게 지정해주세요.');
      return;
    }

    if (data.sizeY < 10) {
      showInfoModal('세로길이는 최소 10보다 크게 지정해주세요.');
      return;
    }

    try {
      apiUpdateRoom(id, data).then(() => {
        setRoomUpdateData({});
        fetchRooms();
      });
    } catch {
      setInfoModal(false);
    }
  };

  const handleRoom = (id) => {
    const room = rooms.find((item) => item.id === id);
    setSelectedRoom(room);
  };

  const handleDeskModal = () => {
    setIsDeskModalOn(!isDeskModalOn);
  };

  const handleRoomModal = (type, room) => {
    switch (type) {
      case 'CREATE':
        setIsRoomModalOn(!isRoomModalOn);
        break;
      case 'UPDATE':
        setRoomUpdateData(room);
        break;
      case 'DELETE':
        setRoomDeleteData(room);
        break;
      default:
        showInfoModal('올바르지 않은 접근입니다.');
        break;
    }
  };

  const handleRoomConfirm = (type, room) => {
    switch (type) {
      case 'CREATE':
        makeNewRoom(room);
        break;
      case 'UPDATE':
        updateRoom(room);
        break;
      case 'DELETE':
        deleteRoom();
        break;
      default:
        showInfoModal('올바르지 않은 접근입니다.');
        break;
    }
  };

  const handleDeskForm = (e) => {
    const { name, value } = e.target;

    setDeskForm({
      ...deskForm,
      [name]: value,
    });
  };

  useEffect(() => {
    if (getStorage('ACCESS_TOKEN')) {
      fetchData();
    } else {
      history.push('/login');
    }

    setAccountLevel(Number(getStorage('ACCOUNT_LEVEL')) ?? 0);
  }, []);

  return (
    <MainPage>
      {isDeskModalOn && (
        <DeskCreateModal
          groups={groups}
          handleDeskForm={handleDeskForm}
          deskForm={deskForm}
          handleDeskModal={handleDeskModal}
        />
      )}
      {isRoomModalOn && (
        <RoomCreateModal
          onClose={() => handleRoomModal('CREATE', {})}
          onConfirm={(data) => handleRoomConfirm('CREATE', data)}
        />
      )}
      {roomDeleteData && roomDeleteData.id && (
        <RoomDeleteModal
          roomDeleteData={roomDeleteData}
          onClose={() => handleRoomModal('DELETE', {})}
          onConfirm={() => handleRoomConfirm('DELETE')}
        />
      )}
      {roomUpdateData && roomUpdateData.id && (
        <RoomUpdateModal
          roomUpdateData={roomUpdateData}
          onClose={() => handleRoomModal('UPDATE', {})}
          onConfirm={(data) => handleRoomConfirm('UPDATE', data)}
        />
      )}
      {isInfoModalVisible && <InfoModal title={infoModalTitle} hideInfoModal={hideInfoModal} />}
      <MainContainer>
        <TitleContainer>
          <Title>
            {selectedRoom.title && `${selectedRoom.title} `}
            자리 배치도
          </Title>
        </TitleContainer>
        {selectedRoom && selectedRoom.id && (
          <Grid
            showInfoModal={showInfoModal}
            handleDeskModal={handleDeskModal}
            roomId={selectedRoom.id}
            sizeX={selectedRoom.sizeX}
            sizeY={selectedRoom.sizeY}
            socketConnection={socketConnection}
            accountLevel={accountLevel}
          />
        )}
        <Tabs
          rooms={rooms}
          handleRoomModal={handleRoomModal}
          handleRoom={handleRoom}
          selectedRoom={selectedRoom}
          accountLevel={accountLevel}
        />
      </MainContainer>
    </MainPage>
  );
}
const MainPage = styled.div`
  height: 100vh;
`;

const Title = styled.p`
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  background: #333;
  color: white;
`;

const TitleContainer = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 60px;
  padding: 0 16px;
`;

const MainContainer = styled.div`
  height: calc(100vh-40px);
  padding-bottom: 40px;
`;

export default Main;
