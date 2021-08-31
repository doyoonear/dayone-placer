import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DeleteIcon from '../icons/DeleteIcon';
import { handleGridColor } from '../../styles/theme';

const GridItem = ({ location, data, handleDrag, handleDrop, addNewItem, deleteItem, partList }) => {
  const [currLocation, setCurrLocation] = useState({ x: '0', y: '0' });
  const [isDeleteIconOn, setDeleteIcon] = useState(false);

  const getPartColor = (type) => {
    const part = partList.find((item) => item.type === type);
    return part?.color;
  };

  const getPartTitle = (type) => {
    const part = partList.find((item) => item.type === type);
    return part?.title;
  };

  const submitDelete = (e) => {
    const targetLocation = { x: e.target.dataset.x, y: e.target.dataset.y };
    setCurrLocation(targetLocation);
    setDeleteIcon(!isDeleteIconOn);
  };

  const submitAddNewItem = (e) => {
    const targetLocation = { x: e.target.dataset.x, y: e.target.dataset.y };
    setCurrLocation(targetLocation);
    addNewItem({ data, location: targetLocation });
  };

  const onIconClick = () => {
    deleteItem({ data, location: currLocation });

    setDeleteIcon(false);
  };

  const checkGridEmpty = (e) => {
    const type = e.target.getAttribute('data-type');
    return type === null ? submitAddNewItem(e) : submitDelete(e);
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

  return (
    <GridItemContainer>
      <Bullet
        draggable={(data.type && true) || false}
        type={data.type}
        data-type={data.type}
        color={getPartColor(data.type)}
        data-x={location.x}
        data-y={location.y}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={(e) => handleDrag(e, data)}
        onDrop={(e) => handleDrop(e, data)}
        onClick={(e) => checkGridEmpty(e)}
      >
        {renderTitle()}
      </Bullet>

      {isDeleteIconOn && (
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
  partList: PropTypes.object,
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
  background-color: ${(props) => (props.color ? props.color : props.theme.primary8)};
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
  border: 1px solid lightgrey;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  background: ${({ type, color }) => color ?? handleGridColor(type)};

  :hover {
    border: solid 4px ${(props) => props.theme.primary8};
  }
`;

export default GridItem;
