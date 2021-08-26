import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';

function ArrowIcon({ width, height, rotate }) {
  return (
    <StIconContainer width={width} height={height} rotate={rotate}>
      <RightArrow />
    </StIconContainer>
  );
}
ArrowIcon.defaultProps = {
  width: 1,
  height: 1,
  rotate: 0,
};

ArrowIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
};

const StIconContainer = styled.div`
  width: ${(props) => props.width || '1'}rem;
  height: ${(props) => props.height || '1'}rem;
  transform: ${(props) => `rotate(${props.rotate}deg)` || '0'};
  border: 0.1rem solid red;
`;

export default ArrowIcon;
