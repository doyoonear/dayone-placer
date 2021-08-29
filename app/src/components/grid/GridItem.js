import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridItem = ({ locationX, locationY, data, handleDrag, handleDrop, addNewDesk, deleteDesk }) => {
  const checkDeskEmpty = (e) => {
    // 해당 location div 의 data-type check
    // e.target 의 data-type
    const type = 'GRID';
    const location = { x: e.target.dataset.x, y: e.target.dataset.y };
    return type === 'GRID' ? addNewDesk(location) : deleteDesk(location);
  };

  return (
    <Bullet
      draggable
      data-type='GRID'
      data-x={locationX}
      data-y={locationY}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleDrag}
      onDrop={(e) => handleDrop(e, data)}
      onClick={(e) => checkDeskEmpty(e)}
    >
      {data.type?.substring(0, 1)}
      {data.name}
    </Bullet>
  );
};

GridItem.propTypes = {
  locationX: PropTypes.number,
  locationY: PropTypes.number,
  data: PropTypes.object,
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
};

GridItem.defaultProps = {
  locationX: 0,
  locationY: 0,
  data: {},
  handleDrag: () => {},
  handleDrop: () => {},
};

const Bullet = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  text-align: center;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.primary8};
  }
`;

export default GridItem;
