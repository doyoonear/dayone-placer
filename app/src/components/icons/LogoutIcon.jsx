import React from 'react';
import PropTypes from 'prop-types';
import Logout from '../../assets/logout.svg';
import CommonIconBox from '../_styled/CommonIconBox';

function LogoutIcon({ width, height, rotate }) {
  return (
    <CommonIconBox color='gray' width={width} height={height} rotate={rotate}>
      <Logout />
    </CommonIconBox>
  );
}
LogoutIcon.defaultProps = {
  width: 1,
  height: 1,
  rotate: 0,
};

LogoutIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
};

export default LogoutIcon;
