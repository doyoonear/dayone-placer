import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Grid from '../components/Grid.jsx';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

function Main() {
  const [isDeskModalOn, setIsDeskModalOn] = useState(false);
  const [isRoomModalOn, setIsRoomModalOn] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [deskForm, setDeskForm] = useState({
    team: '',
    x: null,
    y: null,
  });

  const fetchData = () => {
    const findRooms = async () => {
      const result = await axios.get('http://localhost:4000/rooms');
      setRooms(result.data);
    };

    const findGroups = async () => {
      const result = await axios.get('http://localhost:4000/groups');
      setGroups(result.data);
    };

    findRooms();
    findGroups();
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
        <Title>자리 배치도</Title>
        {isDeskModalOn && (
          <Modal title='책상 그룹 추가'>
            <InputWrapper>
              <Dropdown label='팀' options={groups} name='team' onChange={handleDeskForm} />
              <Input label='책상 가로' type='number' name='x' onChange={handleDeskForm} value={deskForm.x} />
              <Input label='책상 세로' type='number' name='y' onChange={handleDeskForm} value={deskForm.y} />
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
        <Grid handleDeskModal={handleDeskModal} />
        <Tabs rooms={rooms} handleRoomModal={handleRoomModal} />
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
`;

export default Main;
