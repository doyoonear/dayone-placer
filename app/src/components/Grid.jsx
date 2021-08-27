import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

function Grid({ handleDeskModal }) {
  const grid = {
    cols: 20,
    rows: 10,
  };

  const rendering = (x, y) => {
    const result = [];
    for (let i = 0; i < x * y; i += 1) {
      result.push(
        <Bullet
          key={i + 1}
          id={i + 1}
          // x, y 너비가 아닌 좌표값으로 변경 필요
          data-x={x}
          data-y={y}
          onClick={(e) => console.log(e.target.dataset.x, e.target.dataset.y)}
        />
      );
    }
    return result;
  };

  return (
    <GridContainer onClick={handleDeskModal}>
      <GridWrapper>{rendering(grid.cols, grid.rows)}</GridWrapper>
    </GridContainer>
  );
}

Grid.propTypes = {
  handleDeskModal: PropTypes.func.isRequired,
};

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: fit-content;
`;

const Bullet = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  text-align: center;
  cursor: pointer;
`;

export default Grid;
