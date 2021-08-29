import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import CommonIconContainer from '../_styled/CommonIconBox';

function ArrowIcon({ width, height, rotate }) {
  return (
    <CommonIconContainer width={width} height={height} rotate={rotate}>
      <RightArrow />
    </CommonIconContainer>
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

export default ArrowIcon;
