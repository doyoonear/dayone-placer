import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import httpClient from '../../api/http-client';

import GridItem from './GridItem';
import Sidebar from '../sidebar/Sidebar';

function Grid({ handleDeskModal, roomId, sizeX, sizeY, socket }) {
  const [dragItem, setDragItem] = useState({});
  const [gridData, setGridData] = useState({});
  console.log('props socket', socket);

  const getRoom = async () => {
    const result = await httpClient.get({ url: `/parts/rooms/${roomId}` });
    const data = {};

    result.data.forEach((part) => {
      data[`${part.locationX}_${part.locationY}`] = part;
    });

    console.log('data', data);

    setGridData(data);
  };

  useEffect(async () => {
    // 데이터 조회
    console.log('roomId', roomId);
    await getRoom();
  }, [roomId]);

  // useEffect(() => {
  //   // gridData 초기화
  // }, [reload]);

  const handleDrag = (e, data) => {
    const type = e.currentTarget.attributes['data-type'].value;

    switch (type) {
      case 'GRID':
        setDragItem({
          type,
          x: Number(e.currentTarget.attributes['data-x'].value),
          y: Number(e.currentTarget.attributes['data-y'].value),
          ...data,
        });
        break;
      case 'DESK':
      case 'WINDOW_1':
        setDragItem({
          type,
          ...data,
        });
        break;
      case 'MEMBER':
        setDragItem({
          type,
          ...data,
        });
        break;

      default:
        console.error('err', type);
        break;
    }
  };

  const handleDrop = (e) => {
    const prevX = dragItem.x;
    const prevY = dragItem.y;

    const nextX = Number(e.currentTarget.attributes['data-x'].value);
    const nextY = Number(e.currentTarget.attributes['data-y'].value);

    console.log(`drag...., (${prevX}, ${prevY}) => (${nextX}, ${nextY})`);

    if (prevX === nextX && prevY === nextY) {
      console.log('제자리 놓기');
      return;
    }

    if (!prevX && !prevY) {
      console.log('새로운 추가 =>', dragItem.type);
      gridData[`${nextX}_${nextY}`] = {
        ...dragItem,
      };

      // TODO: 상수사용, 코스 위치 이동
      socket.emit('APPEND_LOCATION', {
        type: dragItem.type,
        roomId,
        location: {
          x: nextX,
          y: nextY,
        },
      });

      setDragItem({});
      return;
    }

    // TODO: 놓으려는 자리에 무엇인가 있다면?
    console.log('위치 이동');

    if (gridData[`${nextX}_${nextY}`]) {
      // 놓으려는 자리에 무엇인가 있다면
      const temp = gridData[`${nextX}_${nextY}`];
      gridData[`${nextX}_${nextY}`] = gridData[`${prevX}_${prevY}`];
      gridData[`${prevX}_${prevY}`] = temp;

      // TODO: 상수사용, 코스 위치 이동
      socket.emit('CHANGE_LOCATION', {
        type: dragItem.type,
        roomId,
        location: {
          prevX,
          prevY,
          nextX,
          nextY,
        },
      });
    } else {
      // 놓으려는 자리에 아무것도 없다면
      gridData[`${nextX}_${nextY}`] = gridData[`${prevX}_${prevY}`];
      delete gridData[`${prevX}_${prevY}`];

      // TODO: 상수사용, 코스 위치 이동
      socket.emit('MOVE_LOCATION', {
        type: dragItem.type,
        roomId,
        location: {
          prevX,
          prevY,
          nextX,
          nextY,
        },
      });
    }

    setDragItem({});
  };

  const renderGridItem = (cols, rows) => {
    const result = [];
    for (let i = 0; i < cols * rows; i += 1) {
      const x = i % cols;
      const y = parseInt(i / cols, 10);

      result.push(
        <GridItem
          key={i + 1}
          id={i + 1}
          locationX={x}
          locationY={y}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          data={gridData[`${x}_${y}`]}
        />
      );
    }
    return result;
  };

  return (
    <GridContainer>
      <GridWrapper>{renderGridItem(sizeX, sizeY)}</GridWrapper>
      <Sidebar handleDrag={handleDrag} handleDrop={handleDrop} />
    </GridContainer>
  );
}

Grid.propTypes = {
  handleDeskModal: PropTypes.func.isRequired,
  roomId: PropTypes.number,
  sizeX: PropTypes.number,
  sizeY: PropTypes.number,
  socket: PropTypes.object,
};

Grid.defaultProps = {
  roomId: 0,
  sizeX: 0,
  sizeY: 0,
  socket: undefined,
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
