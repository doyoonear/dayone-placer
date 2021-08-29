import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({ name, onClick, disabled, type }) {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled} type={type}>
      {name}
    </ButtonContainer>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
};

const ButtonContainer = styled.button`
  width: 100%;
  min-width: auto;
  height: 44px;
  font-size: 14px;
  border-radius: 4px;
  flex: 1;
`;

export default Button;
