import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Dropdown({ options, label, name, onChange }) {
  return (
    <>
      <Label>{label}</Label>
      <Select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option.id} value={option.title}>
            {option.title}
          </option>
        ))}
      </Select>
    </>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  label: '',
};

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  height: 36px;
  margin-bottom: 20px;
  padding: 0 8px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.primary2};
  border-radius: 4px;
`;

export default Dropdown;
