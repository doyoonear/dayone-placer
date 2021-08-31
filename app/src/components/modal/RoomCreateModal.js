import React from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Modal from './Modal';

const RoomCreateModal = ({ handleRoomForm, roomForm, handleRoomModal, makeNewRoom }) => {
  return (
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
