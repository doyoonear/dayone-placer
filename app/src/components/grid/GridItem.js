import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridItem = ({ locationX, locationY, data, handleDrag, handleDrop }) => {
  return (
    <Bullet
      draggable
      data-type='GRID'
      data-x={locationX}
      data-y={locationY}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleDrag}
      onDrop={(e) => handleDrop(e, data)}
      // onClick={(e) => console.log(e.target.dataset.x, e.target.dataset.y)}
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
