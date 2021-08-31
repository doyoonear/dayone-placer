import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Grid from '../components/grid/Grid.jsx';
import Tabs from '../components/tab/Tabs';
import InfoModal from '../components/modal/InfoModal';
import RoomCreateModal from '../components/modal/RoomCreateModal';
import RoomDeleteModal from '../components/modal/RoomDeleteModal';
import DeskCreateModal from '../components/modal/DeskCreateModal';

import socketConnection from '../common/api/socket';
import { getStorage } from '../common/support/storage';
import { findGroups } from '../common/api/group';
import { findRooms, createRoom, apiDeleteRoom } from '../common/api/room';

function Main() {
  const history = useHistory();
  const [accountLevel, setAccountLevel] = useState(0);
  const [isDeskModalOn, setIsDeskModalOn] = useState(false);
  const [isRoomModalOn, setIsRoomModalOn] = useState(false);
  const [isRoomDeleteModalOn, setIsRoomDeleteModalOn] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [groups, setGroups] = useState([]);
  const [deskForm, setDeskForm] = useState({
    team: '',
    x: 0,
    y: 0,
  });
  const [roomForm, setRoomForm] = useState({
    title: '',
    sizeX: 0,
    sizeY: 0,
  });

  const [isInfoModalVisible, setInfoModal] = useState(false);

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

  const handleRoom = (id) => {
    const room = rooms.find((item) => item.id === id);
    setSelectedRoom(room);
  };

  const handleDeskModal = () => {
    setIsDeskModalOn(!isDeskModalOn);
  };

  const handleRoomModal = () => {
    setIsRoomModalOn(!isRoomModalOn);
  };

  const handleRoomDeleteModal = (room) => {
    setIsRoomDeleteModalOn(room);
  };

  const handleDeskForm = (e) => {
    const { name, value } = e.target;

    setDeskForm({
      ...deskForm,
      [name]: value,
    });
  };

  const handleRoomForm = (e) => {
    const { name, value } = e.target;

    setRoomForm({
      ...roomForm,
      [name]: value,
    });
  };

  const makeNewRoom = async () => {
    if (roomForm.title.length === 0) {
      alert('공간 명을 입력해주세요.');
      return;
    }

    if (roomForm.sizeX <= 10) {
      alert('가로길이는 최소 10보다 크게 지정해주세요.');
      return;
    }

    if (roomForm.sizeY <= 10) {
      alert('세로길이는 최소 10보다 크게 지정해주세요.');
      return;
    }

    try {
      await createRoom(roomForm);
      setIsRoomModalOn(false);
      setInfoModal(true);

      fetchRooms();
    } catch {
      setInfoModal(false);
    }
  };

  const deleteRoom = async () => {
    try {
      await apiDeleteRoom(isRoomDeleteModalOn.id);
      setIsRoomDeleteModalOn({});

      fetchRooms();
    } catch {
      setInfoModal(false);
    }
  };

  const handleInfoModal = (bool) => {
    return setInfoModal(bool);
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
          handleRoomForm={handleRoomForm}
          roomForm={roomForm}
          handleRoomModal={handleRoomModal}
          makeNewRoom={makeNewRoom}
        />
      )}
      {isRoomDeleteModalOn && isRoomDeleteModalOn.id && (
        <RoomDeleteModal
          isRoomDeleteModalOn={isRoomDeleteModalOn}
          handleRoomDeleteModal={handleRoomDeleteModal}
          deleteRoom={deleteRoom}
        />
      )}
      {isInfoModalVisible && <InfoModal title='생성되었습니다.' handleInfoModal={handleInfoModal} />}
      <MainContainer>
        <TitleContainer>
          <Title>
            {selectedRoom.title && `${selectedRoom.title} `}
            자리 배치도
          </Title>
        </TitleContainer>
        {selectedRoom && selectedRoom.id && (
          <Grid
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
          handleRoomDeleteModal={handleRoomDeleteModal}
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
