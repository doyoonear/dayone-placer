import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Grid from '../components/grid/Grid';
import Tabs from '../components/tab/Tabs';
import InfoModal from '../components/modal/InfoModal';
import RoomCreateModal from '../components/modal/RoomCreateModal';
import RoomDeleteModal from '../components/modal/RoomDeleteModal';
import RoomUpdateModal from '../components/modal/RoomUpdateModal';
import LogoutIcon from '../components/icons/LogoutIcon';

import socketConnection from '../common/api/socket';
import { getStorage } from '../common/support/storage';
import { findRooms, createRoom, apiDeleteRoom, apiUpdateRoom } from '../common/api/room';

function Main() {
  const history = useHistory();
  const [accountLevel, setAccountLevel] = useState(0);
  const [isRoomModalOn, setIsRoomModalOn] = useState(false);
  const [roomDeleteData, setRoomDeleteData] = useState({});
  const [roomUpdateData, setRoomUpdateData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});

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
      if (!selectedRoom?.id && result.data.length > 0) {
        setSelectedRoom(result.data[0]);
      }
    });
  };

  const fetchData = () => {
    fetchRooms();
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
        showInfoModal('생성되었습니다.');

        fetchRooms();
      });
    } catch (err) {
      showInfoModal(err.message);
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

        if (id === selectedRoom?.id) {
          const newSelectedRoom = { ...selectedRoom };
          newSelectedRoom.title = data.title;
          newSelectedRoom.sizeX = data.sizeX;
          newSelectedRoom.sizeY = data.sizeY;
          setSelectedRoom(newSelectedRoom);
        }
      });
    } catch {
      setInfoModal(false);
    }
  };

  const handleRoom = (id) => {
    const room = rooms.find((item) => item.id === id);
    setSelectedRoom(room);
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

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
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
          <IconButton onClick={handleLogout}>
            <LogoutIcon width={1} height={1} rotate={0} />
          </IconButton>
        </TitleContainer>
        {selectedRoom && selectedRoom.id && (
          <Grid
            showInfoModal={showInfoModal}
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

const IconButton = styled.button`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  padding-left: 0.1rem;
  background-color: ${(props) => (props.color ? props.color : props.theme.primary4)};
`;

export default Main;
