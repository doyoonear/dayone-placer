import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../components/grid/Grid.jsx';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Sidebar from '../components/Sidebar';

import httpClient from '../api/http-client';

function Main() {
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

  const fetchData = () => {
    const findRooms = async () => {
      const result = await httpClient.get({ url: '/rooms' });
      setRooms(result.data);
    };

    const findGroups = async () => {
      const result = await httpClient.get({ url: '/groups' });
      setGroups(result.data);
    };

    findRooms();
    findGroups();
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

  useEffect(() => {
    fetchData();
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
              <Input label='공간명' name='roomName' onChange={handleDeskForm} />
              <Input label='가로' type='number' name='x' onChange={handleDeskForm} />
              <Input label='세로' type='number' name='y' onChange={handleDeskForm} />
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={handleRoomModal} name='취소' />
              <Button name='확인' onClick={() => console.log(deskForm)} />
            </ButtonWrapper>
          </Modal>
        )}
        {selectedRoom && selectedRoom.id && (
          <Grid
            handleDeskModal={handleDeskModal}
            roomId={selectedRoom.id}
            sizeX={selectedRoom.sizeX}
            sizeY={selectedRoom.sizeY}
          />
        )}
        <StAbsoluteBox>
          <Sidebar />
        </StAbsoluteBox>
        <Tabs rooms={rooms} handleRoomModal={handleRoomModal} handleRoom={handleRoom} />
      </MainContainer>
    </MainPage>
  );
}

const StAbsoluteBox = styled.div`
  position: fixed;
  right: 0;
`;

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
`;

export default Main;
