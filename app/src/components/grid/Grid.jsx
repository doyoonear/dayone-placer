import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GridItem from './GridItem';
import Sidebar from '../sidebar/Sidebar';
import DeleteIcon from '../icons/DeleteIcon';

import { SOCKET_EVENT_TYPE } from '../../common/policy';
import { findRoomParts } from '../../common/api/grid';

function Grid({ handleDeskModal, roomId, sizeX, sizeY, socketConnection }) {
  const [dragItem, setDragItem] = useState({});
  const [gridData, setGridData] = useState({});

  const fetchData = async () => {
    const response = await findRoomParts(roomId);
    const data = {};

    response.data.forEach((part) => {
      data[`${part.locationX}_${part.locationY}`] = part;
    });

    setGridData(data);
  };

  const socketAppendLocation = ({ type, roomId: socketRoomId, location }) => {
    // Server 에서 처리하도록 수정필요
    if (roomId !== socketRoomId) {
      return;
    }

    gridData[`${location.x}_${location.y}`] = {
      type,
      roomId,
      location: {
        x: location.x,
        y: location.y,
      },
    };

    setDragItem({});
  };

  useEffect(() => {
    socketConnection.on(SOCKET_EVENT_TYPE.APPEND_LOCATION, (data) => {
      socketAppendLocation(data);
    });

    return () => {
      socketConnection.removeListener(SOCKET_EVENT_TYPE.APPEND_LOCATION);
    };
  }, [gridData]);

  const handleDrag = (e, data) => {
    const type = e.currentTarget.attributes['data-type'].value;

    setDragItem({
      type,
      ...data,
      x: Number(e.currentTarget.attributes['data-x']?.value),
      y: Number(e.currentTarget.attributes['data-y']?.value),
    });
  };

  const addNewItem = ({ data, location }) => {
    gridData[`${location.x}_${location.y}`] = data;

    socketConnection.emit(SOCKET_EVENT_TYPE.APPEND_LOCATION, {
      roomId,
      data,
      location,
    });

    setDragItem({});
  };

  const deleteItem = ({ data, location }) => {
    socketConnection.emit(SOCKET_EVENT_TYPE.DELETE_LOCATION, {
      data,
      roomId,
      location,
    });

    setDragItem({});
  };

  const moveItem = ({ data, location }) => {
    const { prevX, prevY, nextX, nextY } = location;

    gridData[`${nextX}_${nextY}`] = gridData[`${prevX}_${prevY}`];
    delete gridData[`${prevX}_${prevY}`];

    socketConnection.emit(SOCKET_EVENT_TYPE.MOVE_LOCATION, {
      data,
      roomId,
      location: {
        prevX,
        prevY,
        nextX,
        nextY,
      },
    });

    setDragItem({});
  };

  const changeItem = ({ data, location }) => {
    const { prevX, prevY, nextX, nextY } = location;

    const temp = gridData[`${nextX}_${nextY}`];
    gridData[`${nextX}_${nextY}`] = gridData[`${prevX}_${prevY}`];
    gridData[`${prevX}_${prevY}`] = temp;

    socketConnection.emit(SOCKET_EVENT_TYPE.CHANGE_LOCATION, {
      data,
      roomId,
      location: {
        prevX,
        prevY,
        nextX,
        nextY,
      },
    });

    setDragItem({});
  };

  const handleDrop = (e) => {
    const prevX = dragItem.x;
    const prevY = dragItem.y;

    const nextX = Number(e.currentTarget.attributes['data-x'].value);
    const nextY = Number(e.currentTarget.attributes['data-y'].value);

    if (prevX === nextX && prevY === nextY) {
      return;
    }

    if (!prevX && !prevY) {
      addNewItem({ data: dragItem, memberId: dragItem.memberId, location: { x: nextX, y: nextY } });
      return;
    }

    if (gridData[`${nextX}_${nextY}`]) {
      // 놓으려는 자리에 무엇인가 있다면
      changeItem({
        data: dragItem,
        location: {
          prevX,
          prevY,
          nextX,
          nextY,
        },
      });
    } else {
      // 놓으려는 자리에 아무것도 없다면
      moveItem({
        data: dragItem,
        location: {
          prevX,
          prevY,
          nextX,
          nextY,
        },
      });
    }
  };

  const makeGridItem = (cols, rows) => {
    const result = [];
    for (let i = 0; i < cols * rows; i += 1) {
      const x = i % cols;
      const y = parseInt(i / cols, 10);
      result.push(
        <GridItem
          key={`${x}_${y}`}
          id={i}
          location={{ x, y }}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          addNewItem={addNewItem}
          deleteItem={deleteItem}
          data={gridData[`${x}_${y}`]}
        />
      );
    }

    return result;
  };

  useEffect(async () => {
    // 데이터 조회
    fetchData().then(() => {});
    makeGridItem();
  }, [roomId]);

  return (
    <GridContainer>
      <GridWrapper width={sizeX} height={sizeY}>
        {makeGridItem(sizeX, sizeY)}
      </GridWrapper>
      <Sidebar handleDrag={handleDrag} handleDrop={handleDrop} />
    </GridContainer>
  );
}

Grid.propTypes = {
  handleDeskModal: PropTypes.func.isRequired,
  roomId: PropTypes.number,
  sizeX: PropTypes.number,
  sizeY: PropTypes.number,
  socketConnection: PropTypes.object,
};

Grid.defaultProps = {
  roomId: 0,
  sizeX: 0,
  sizeY: 0,
  socketConnection: undefined,
};

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1080px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-template-rows: repeat(${({ height }) => height}, 1fr);
  width: fit-content;
`;

export default Grid;
