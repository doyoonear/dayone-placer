import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import CommonModal from '../_styled/CommonModal';

const RoomDeleteModal = ({ roomDeleteData, onClose, onConfirm }) => {
  return (
    <CommonModal title='공간 삭제'>
      <Title>
        {roomDeleteData.title}
        를 삭제하시겠습니까?
        <br />
        삭제 후에는 복구가 불가능합니다.
      </Title>
      <ButtonWrapper>
        <Button onClick={() => onClose()} name='취소' />
        <Button name='확인' onClick={onConfirm} />
      </ButtonWrapper>
    </CommonModal>
  );
};

const Title = styled.p`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 0.6rem;
`;

export default RoomDeleteModal;
