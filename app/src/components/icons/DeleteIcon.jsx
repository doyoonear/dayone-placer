import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import CommonIconContainer from '../_styled/CommonIconBox';

function DeleteIcon({ width, height, rotate }) {
  return (
    <CommonIconContainer width={width} height={height} rotate={rotate}>
      <Trash />
    </CommonIconContainer>
  );
}
DeleteIcon.defaultProps = {
  width: 1,
  height: 1,
  rotate: 0,
};

DeleteIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
};

export default DeleteIcon;
