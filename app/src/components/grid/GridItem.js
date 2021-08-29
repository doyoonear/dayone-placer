import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridItem = ({ locationX, locationY, data, handleDrag, handleDrop, addNewItem, deleteItem }) => {
  const checkDeskEmpty = (e) => {
    // TODO: e.target 의 data-type 체크 해서 GRID 일때 addNewItem. (optional: 선택해서 다른 타입 넣기)
    // TODO: DESK, PARTS 의 type 이 모두 GRID 임 (어떻게 연결되어있는지 확인)

    const type = 'GRID';
    const location = { x: e.target.dataset.x, y: e.target.dataset.y };
    return type === 'GRID' ? addNewItem({ location }) : deleteItem({ location });
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
