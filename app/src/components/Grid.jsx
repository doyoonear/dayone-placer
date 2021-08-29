import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GridItem from './GridItem';

function Grid({ handleDeskModal, sizeX, sizeY }) {
  const [dragItem, setDragItem] = useState({});

  const handleDrag = (e) => {
    console.log('drag start');
    setDragItem({
      prev: {
        x: Number(e.currentTarget.attributes['data-x'].value),
        y: Number(e.currentTarget.attributes['data-y'].value),
      },
    });
  };

  const handleDrop = (e) => {
    console.log('drop!');
    const prevX = dragItem.prev.x;
    const prevY = dragItem.prev.y;

    const nextX = e.currentTarget.attributes['data-x'].value;
    const nextY = e.currentTarget.attributes['data-y'].value;

    console.log(`drag...., (${prevX}, ${prevY}) => (${nextX}, ${nextY})`);

    if (prevX === nextX && prevY === nextY) {
      console.log('제자리 놓기');
      return;
    }

    console.log('END');
  };

  const renderGridItem = (cols, rows) => {
    const result = [];
    for (let i = 0; i < cols * rows; i += 1) {
      const x = parseInt(i / cols, 10);
      const y = i % cols;

      result.push(
        <GridItem key={i + 1} id={i + 1} locationX={x} locationY={y} handleDrag={handleDrag} handleDrop={handleDrop} />
      );
    }
    return result;
  };

  return (
    // <GridContainer onClick={handleDeskModal}>
    <GridContainer>
      <GridWrapper>{renderGridItem(sizeX, sizeY)}</GridWrapper>
    </GridContainer>
  );
}

Grid.propTypes = {
  handleDeskModal: PropTypes.func.isRequired,
  sizeX: PropTypes.number,
  sizeY: PropTypes.number,
};

Grid.defaultProps = {
  sizeX: 0,
  sizeY: 0,
};

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1080px;
`;

// TODO: repeat 변수로 수정 필요
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(30, 1fr);
  grid-template-rows: repeat(30, 1fr);
  width: fit-content;
`;

export default Grid;
