import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Grid() {
  // const [roomSizeX, setRoomSizeX] = useState(30);
  // const [roomSizeXY, setRoomSizeY] = useState(30);
  const [sectionX, setSectionX] = useState(0);
  const [sectionY, setSectionY] = useState(0);
  const room = { sizeX: 30, sizeY: 30 };
  const list = []; // sizeX 30 만큼 가로로 맵 돌리고,
  // 그렇게 생성된 2번째 리스트를 또 sizeY 30만큼 세로로 맵 돌리고

  useEffect(async () => {
    await axios.get('/');
  }, []);

  return (
    <StyledContainer>
      {list.map(() => (
        <StyledSection sectionX={sectionX} sectionY={sectionY} />
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: ${(props) => props.color || '#fcfcfc'};
  padding: ${(props) => props.padding || '2rem'};
`;

const StyledSection = styled.div`
  width: ${(props) => props.sectionX || '1'}rem;
  height: ${(props) => props.sectionY || '1'}rem;
  border: 0.1rem solid red;
`;

export default Grid;
