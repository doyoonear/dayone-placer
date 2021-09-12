import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Modal from './Modal';

const RoomDeleteModal = ({ roomDeleteData, onClose, onConfirm }) => {
  const message = `${roomDeleteData.title}를 삭제하시겠습니까? 삭제 후에는 복구가 불가능합니다.`;
  return (
    <Modal title='공간 삭제'>
      <TitleWrapper>{message}</TitleWrapper>
      <ButtonWrapper>
        <Button onClick={() => onClose()} name='취소' />
        <Button name='확인' onClick={onConfirm} />
      </ButtonWrapper>
    </Modal>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 0.6rem;
`;

export default RoomDeleteModal;
