import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ArrowIcon from '../icons/ArrowIcon';
import CommonFlexBox from '../_styled/CommonFlexBox';
import { Context } from '../../store/Store';

function GroupHeader({ isGroupOpen, setIsGroupOpen, group }) {
  const { state, dispatch } = useContext(Context);
  const [arrowDeg, setArrowDeg] = useState(90);

  const changeArrowDeg = () => {
    return isGroupOpen ? setArrowDeg(270) : setArrowDeg(90);
  };

  const toggleGroupHeader = (id) => {
    if (id === group.id) {
      changeArrowDeg();
      setIsGroupOpen(!isGroupOpen);
    }
  };

  const handleGroupOpen = (groupId) => {
    dispatch({ type: 'TOGGLE_GROUPMEMBERS', groupId });
  };

  useEffect(() => console.log(isGroupOpen));

  return (
    <CommonFlexBox justify='space-between' onClick={() => handleGroupOpen(group.id)}>
      <h3>{group.title}</h3>
      <ArrowIcon width={1} height={1} rotate={arrowDeg} />
    </CommonFlexBox>
  );
}

GroupHeader.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupHeader;
