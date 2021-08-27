import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Input({ value, type, label, onChange, name }) {
  return (
    <>
      <Label>{label}</Label>
      <InputContainer name={name} value={value} type={type} onChange={onChange} />
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  label: '',
};

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
`;

const InputContainer = styled.input`
  width: 100%;
  height: 36px;
  margin-bottom: 20px;
  padding: 0 8px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.primary2};
  border-radius: 4px;
`;

export default Input;
