import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Grid from '../components/grid/Grid.jsx';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import InfoModal from '../components/InfoModal';

import socketConnection from '../common/api/socket';
import { getStorage } from '../common/support/storage';
import { findGroups } from '../common/api/group';
import { findRooms, createRoom } from '../common/api/room';

function Main() {
  const history = useHistory();
  const [isDeskModalOn, setIsDeskModalOn] = useState(false);
  const [isRoomModalOn, setIsRoomModalOn] = useState(false);
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

  const handleDeskForm = (e) => {
    const { name, value } = e.target;

    setDeskForm({
      ...deskForm,
      [name]: value,
    });
  };

  const handleRoomForm = (e) => {
    const { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);

    setRoomForm({
      ...roomForm,
      [name]: value,
    });
  };

  const makeNewRoom = async () => {
    try {
      await createRoom(roomForm);
      setIsRoomModalOn(false);
      setInfoModal(true);

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
    } else history.push('/login');
  }, []);

  return (
    <MainPage>
      <MainContainer>
        <Title>
          {selectedRoom.title && `${selectedRoom.title} `}
          자리 배치도
        </Title>
        {isDeskModalOn && (
          <Modal title='책상 그룹 추가'>
            <InputWrapper>
              <Dropdown
                label='팀'
                options={groups}
                name='team'
                onChange={handleDeskForm}
                placeholder='팀을 선택해주세요'
              />
              <Input label='책상 가로' type='number' name='x' onChange={handleDeskForm} value={deskForm.xc} />
              <Input label='책상 세로' type='number' name='y' onChange={handleDeskForm} value={deskForm.yc} />
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={handleDeskModal} name='취소' />
              <Button name='확인' onClick={() => console.log(deskForm)} />
            </ButtonWrapper>
          </Modal>
        )}
        {isRoomModalOn && (
          <Modal title='공간 추가'>
            <InputWrapper>
              <Input label='공간명' name='title' onChange={handleRoomForm} value={roomForm.title} />
              <Input label='가로' type='number' name='sizeX' onChange={handleRoomForm} value={roomForm.sizeX} />
              <Input label='세로' type='number' name='sizeY' onChange={handleRoomForm} value={roomForm.sizeY} />
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={handleRoomModal} name='취소' />
              <Button name='확인' onClick={makeNewRoom} />
            </ButtonWrapper>
          </Modal>
        )}
        {selectedRoom && selectedRoom.id && (
          <Grid
            handleDeskModal={handleDeskModal}
            roomId={selectedRoom.id}
            sizeX={selectedRoom.sizeX}
            sizeY={selectedRoom.sizeY}
            socketConnection={socketConnection}
          />
        )}
        <Tabs rooms={rooms} handleRoomModal={handleRoomModal} handleRoom={handleRoom} />
        {isInfoModalVisible && <InfoModal title='생성되었습니다.' handleInfoModal={handleInfoModal} />}
      </MainContainer>
    </MainPage>
  );
}

const MainPage = styled.div``;

const Title = styled.p`
  margin: 20px;
`;

const MainContainer = styled.div`
  position: fixed;
  z-index: 20;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 0.6rem;
`;

export default Main;
