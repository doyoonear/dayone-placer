import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Context } from '../../store/Store';
import DeleteIcon from '../icons/DeleteIcon';
import { handleGridColor } from '../../styles/theme';
import { ACCOUNT_PERMISSION } from '../../common/policy';

const GridItem = ({ location, data, handleDrag, handleDrop, deleteItem, partList, accountLevel }) => {
  const { state, dispatch } = useContext(Context);
  const [currLocation, setCurrLocation] = useState({ x: '0', y: '0' });
  const [isMatchLocation, setMatchLocation] = useState(false);

  const getPartColor = (type) => {
    const part = partList.find((item) => item.type === type);
    return part?.color;
  };

  const getMemberColor = (d) => {
    return state.groupColors[d.member.groupId];
  };

  const getPartTitle = (type) => {
    const part = partList.find((item) => item.type === type);
    return part?.title;
  };

  const checkDeleteIconLocation = () => {
    return currLocation === state.location ? setMatchLocation(true) : setMatchLocation(false);
  };

  const submitDelete = (e) => {
    const targetLocation = { x: e.target.dataset.x, y: e.target.dataset.y };
    setCurrLocation(targetLocation);
    dispatch({ type: 'TOGGLE_DELETEBTN', location: targetLocation });
  };

  const onIconClick = () => {
    deleteItem({ data, location: currLocation });

    dispatch({ type: 'TOGGLE_DELETEBTN', value: false });
  };

  const checkGridEmpty = (e) => {
    const type = e.target.getAttribute('data-type');
    if (type !== null) {
      submitDelete(e);
    }
  };

  const renderTitle = () => {
    switch (data.type) {
      case 'WAY':
        return '';
      case 'MEMBER':
        return data.member?.name;
      default:
        return getPartTitle(data.type);
    }
  };
  useEffect(() => {
    checkDeleteIconLocation();
  }, [state.location]);

  useEffect(() => {}, []);

  return (
    <GridItemContainer>
      <Bullet
        draggable={(data.type && accountLevel === ACCOUNT_PERMISSION.ALL && true) || false}
        type={data.type}
        data-type={data.type}
        color={data.type === 'MEMBER' ? getMemberColor(data) : getPartColor(data.type)}
        data-x={location.x}
        data-y={location.y}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={(e) => handleDrag(e, data)}
        onDrop={(e) => handleDrop(e, data)}
        onClick={(e) => checkGridEmpty(e)}
      >
        {renderTitle()}
      </Bullet>

      {state.isDeleteIconOn && isMatchLocation && accountLevel === ACCOUNT_PERMISSION.ALL && (
        <IconButton onClick={onIconClick}>
          <DeleteIcon width={1} height={1} rotate={0} />
        </IconButton>
      )}
    </GridItemContainer>
  );
};

GridItem.propTypes = {
  location: PropTypes.objectOf(PropTypes.number),
  data: PropTypes.object,
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
  partList: PropTypes.array,
};

GridItem.defaultProps = {
  location: { x: 0, y: 0 },
  data: {},
  handleDrag: () => {},
  handleDrop: () => {},
  partList: [],
};

const GridItemContainer = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  position: absolute;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => (props.color ? props.color : props.theme.primary4)};
  right: -2rem;
  top: -2rem;
  z-index: 10;
`;

const Bullet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 32px;
  border: 0.3px solid ${(props) => props.theme.grey2};
  font-weight: ${(props) => (props.type === 'MEMBER' ? 'bold' : 'normal')};
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  background: ${({ type, color }) => color ?? handleGridColor(type)};

  :hover {
    border: solid 3px ${(props) => props.theme.primary4};
  }
`;

export default GridItem;
