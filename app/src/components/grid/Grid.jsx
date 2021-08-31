import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GridItem from './GridItem';
import Sidebar from '../sidebar/Sidebar';
import DeleteIcon from '../icons/DeleteIcon';

import { ACCOUNT_PERMISSION, SOCKET_EVENT_TYPE, DEFAULT_PART_LIST } from '../../common/policy';
import findRoomParts from '../../common/api/grid';

function Grid({ handleDeskModal, roomId, sizeX, sizeY, socketConnection, accountLevel }) {
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

  // 이 코드들을 분리할 수 없을까..
  const addNewItem = ({ data, location }) => {
    console.log('data >>>', data); // 비어있음 {}
    gridData[`${location.x}_${location.y}`] = data;

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

    setDragItem({});
  };

  const changeItem = ({ data, location }) => {
    const { prevX, prevY, nextX, nextY } = location;

    const temp = gridData[`${nextX}_${nextY}`];
    gridData[`${nextX}_${nextY}`] = gridData[`${prevX}_${prevY}`];
    gridData[`${prevX}_${prevY}`] = temp;

    setDragItem({});
  };

  const socketAppendLocation = ({ data, location }) => {
    addNewItem({ data, location });
  };

  const socketMoveLocation = ({ data, location }) => {
    moveItem({ data, location });
  };

  const socketChangeLocation = ({ data, location }) => {
    changeItem({ data, location });
  };

  useEffect(() => {
    socketConnection.on(SOCKET_EVENT_TYPE.APPEND_LOCATION, (data) => {
      socketAppendLocation(data);
    });

    socketConnection.on(SOCKET_EVENT_TYPE.MOVE_LOCATION, (data) => {
      socketMoveLocation(data);
    });

    socketConnection.on(SOCKET_EVENT_TYPE.CHANGE_LOCATION, (data) => {
      socketChangeLocation(data);
    });

    return () => {
      socketConnection.removeListener(SOCKET_EVENT_TYPE.APPEND_LOCATION);
      socketConnection.removeListener(SOCKET_EVENT_TYPE.MOVE_LOCATION);
      socketConnection.removeListener(SOCKET_EVENT_TYPE.CHANGE_LOCATION);
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

  const handleDrop = (e) => {
    const prevX = dragItem.x;
    const prevY = dragItem.y;

    const nextX = Number(e.currentTarget.attributes['data-x'].value);
    const nextY = Number(e.currentTarget.attributes['data-y'].value);

    if (prevX === nextX && prevY === nextY) {
      return;
    }

    if (!prevX && !prevY) {
      // 새로운 추가
      if (gridData[`${nextX}_${nextY}`]) {
        if (dragItem.type !== 'MEMBER') {
          alert('이미 물건이 배치되어 있어요');
          return;
        }

        if (gridData[`${nextX}_${nextY}`].type !== 'DESK') {
          alert('빈자리에만 자리배치를 할 수 있어요');
          return;
        }
      } else if (dragItem.type === 'MEMBER') {
        alert('빈 책상에만 배치할 수 있어요');
        return;
      }

      socketConnection.emit(SOCKET_EVENT_TYPE.APPEND_LOCATION, {
        data: dragItem,
        roomId,
        location: { x: nextX, y: nextY },
      });
      return;
    }

    if (gridData[`${nextX}_${nextY}`]) {
      // 놓으려는 자리에 무엇인가 있다면
      socketConnection.emit(SOCKET_EVENT_TYPE.CHANGE_LOCATION, {
        data: dragItem,
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
      socketConnection.emit(SOCKET_EVENT_TYPE.MOVE_LOCATION, {
        data: dragItem,
        roomId,
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
          partList={DEFAULT_PART_LIST}
          accountLevel={accountLevel}
          data={gridData[`${x}_${y}`]}
        />
      );
    }

    return result;
  };

  useEffect(() => {
    // 데이터 조회
    fetchData().then(() => {});
    makeGridItem();

    socketConnection.emit(SOCKET_EVENT_TYPE.ROOM_JOIN, { roomId });

    return () => {
      socketConnection.emit(SOCKET_EVENT_TYPE.ROOM_LEAVE, { roomId });
    };
  }, [roomId]);

  return (
    <>
      <GridBox>
        <GridWrapper width={sizeX} height={sizeY}>
          {makeGridItem(sizeX, sizeY)}
        </GridWrapper>
      </GridBox>
      {accountLevel === ACCOUNT_PERMISSION.ALL && <Sidebar handleDrag={handleDrag} handleDrop={handleDrop} />}
    </>
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

const GridBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  min-width: calc(100vw-300px);
  min-height: calc(100vh-40px);
`;

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-template-rows: repeat(${({ height }) => height}, 1fr);
  width: fit-content;
  overflow: scroll;
  margin-right: 300px;
  border: 2px solid gray;
`;

export default Grid;
