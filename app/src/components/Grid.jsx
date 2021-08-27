import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Grid({ handleDeskModal, sizeX, sizeY }) {
  const rendering = (cols, rows) => {
    const result = [];
    for (let i = 0; i < cols * rows; i += 1) {
      const x = parseInt(i / cols, 10) + 1;
      let y = (i + 1) % cols;

      if (y === 0) {
        y = cols;
      }

      result.push(
        <Bullet
          key={i + 1}
          id={i + 1}
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
      <GridWrapper>{rendering(sizeX, sizeY)}</GridWrapper>
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

export default Grid;
