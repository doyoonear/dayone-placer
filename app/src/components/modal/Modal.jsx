import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Modal({ title, children }) {
  return (
    <ModalDim>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContainer>
    </ModalDim>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

const ModalDim = styled.div`
  position: fixed;
  z-index: 20;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 480px;
  height: auto;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
`;

const ModalTitle = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export default Modal;
