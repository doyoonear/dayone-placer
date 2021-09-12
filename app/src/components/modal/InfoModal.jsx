import React from 'react';
import CommonModal from '../_styled/CommonModal';
import Button from '../Button';

function InfoModal({ title, hideInfoModal }) {
  return (
    <CommonModal title={title}>
      <Button name='확인' onClick={hideInfoModal} />
    </CommonModal>
  );
}

export default InfoModal;
