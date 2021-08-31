import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Button from '../Button';

function InfoModal({ title, hideInfoModal }) {
  return (
    <Modal title={title}>
      <Button name='확인' onClick={hideInfoModal} />
    </Modal>
  );
}

export default InfoModal;
