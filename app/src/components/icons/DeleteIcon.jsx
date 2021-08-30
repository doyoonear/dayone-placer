import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import CommonIconBox from '../_styled/CommonIconBox';

function DeleteIcon({ width, height, rotate }) {
  return (
    <CommonIconBox color='blue' width={width} height={height} rotate={rotate}>
      <Trash />
    </CommonIconBox>
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
