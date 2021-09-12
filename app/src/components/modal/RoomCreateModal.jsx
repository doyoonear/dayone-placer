import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Modal from './Modal';

const RoomCreateModal = ({ onClose, onConfirm }) => {
  const [roomForm, setRoomForm] = useState({
    title: '',
    sizeX: 10,
    sizeY: 10,
  });

  const handleRoomForm = (e) => {
    const { name, value } = e.target;

    setRoomForm({
      ...roomForm,
      [name]: value,
    });
  };

  return (
    <Modal title='공간 추가'>
      <InputWrapper>
        <Input label='공간명' name='title' onChange={handleRoomForm} value={roomForm.title} />
        <Input label='가로' type='number' name='sizeX' onChange={handleRoomForm} value={roomForm.sizeX} />
        <Input label='세로' type='number' name='sizeY' onChange={handleRoomForm} value={roomForm.sizeY} />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={onClose} name='취소' />
        <Button name='확인' onClick={() => onConfirm(roomForm)} />
      </ButtonWrapper>
    </Modal>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 0.6rem;
`;

export default RoomCreateModal;
