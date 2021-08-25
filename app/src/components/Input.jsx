import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Input({ value, type, label }) {
  return (
    <>
      <Label>{label}</Label>
      <InputContainer value={value} type={type} />
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
};

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
`;

const InputContainer = styled.input`
  width: 100%;
  height: 36px;
  margin-bottom: 20px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.primary2};
  border-radius: 4px;
`;

export default Input;
