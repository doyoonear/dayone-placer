import React from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Modal from './Modal';
import Dropdown from '../Dropdown';

const DeskCreateModal = ({ groups, handleDeskForm, deskForm, handleDeskModal }) => {
  return (
    <Modal title='책상 그룹 추가'>
      <InputWrapper>
        <Dropdown label='팀' options={groups} name='team' onChange={handleDeskForm} placeholder='팀을 선택해주세요' />
        <Input label='책상 가로' type='number' name='x' onChange={handleDeskForm} value={deskForm.xc} />
        <Input label='책상 세로' type='number' name='y' onChange={handleDeskForm} value={deskForm.yc} />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={handleDeskModal} name='취소' />
        <Button name='확인' onClick={() => console.log(deskForm)} />
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

export default DeskCreateModal;
