import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Button from '../Button';

function InfoModal({ title, content, handleInfoModal }) {
  return (
    <Modal title={title}>
      {content}
      <Button name='확인' onClick={() => handleInfoModal(false)} />
    </Modal>
  );
}

export default InfoModal;
