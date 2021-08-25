import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({ name, onClick, disabled }) {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled}>
      {name}
    </ButtonContainer>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

const ButtonContainer = styled.button`
  width: 200px;
  height: 44px;
  font-size: 14px;
  border-radius: 4px;
`;

export default Button;
