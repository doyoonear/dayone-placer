import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowIcon from '../icons/ArrowIcon';
import CommonFlexBox from '../_styled/CommonFlexBox';
import { Context } from '../../store/Store';

function GroupHeader({ group }) {
  const { state, dispatch } = useContext(Context);
  const [arrowDeg, setArrowDeg] = useState(90);

  const changeArrowDeg = () => {
    return arrowDeg === 90 ? setArrowDeg(270) : setArrowDeg(90);
  };

  const handleGroupOpen = () => {
    const index = state.groupList.findIndex((storeGroup) => storeGroup.id === group.id);
    dispatch({ type: 'TOGGLE_GROUPMEMBERS', index });
    changeArrowDeg();
  };

  return (
    <CommonFlexBox justify='space-between' onClick={handleGroupOpen}>
      <h3>{group.title}</h3>
      <ArrowIcon width={1} height={1} rotate={arrowDeg} />
    </CommonFlexBox>
  );
}

GroupHeader.propTypes = {
  group: PropTypes.object.isRequired,
};

const Title = styled.p`
  font-size: 12px;
`;

export default GroupHeader;
