import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DeleteIcon from '../icons/DeleteIcon';

const GridItem = ({ location, data, handleDrag, handleDrop, addNewItem, deleteItem }) => {
  const [currLocation, setCurrLocation] = useState({ x: '0', y: '0' });
  const [isDeleteIconOn, setDeleteIcon] = useState(false);
  const submitDelete = (e) => {
    const targetLocation = { x: e.target.dataset.x, y: e.target.dataset.y };
    setCurrLocation(targetLocation);

    setDeleteIcon(true);
  };

  const onIconClick = () => {
    deleteItem({ data, location: currLocation });

    setDeleteIcon(false);
  };

  const checkGridEmpty = (e) => {
    // TODO: e.target 의 data-type 체크 해서 GRID 일때 addNewItem. (optional: 선택해서 다른 타입 넣기)
    // TODO: DESK, PARTS 의 type 이 모두 GRID 임 (어떻게 연결되어있는지 확인)
    const type = e.target.getAttribute('data-type');
    const targetLocation = { x: e.target.dataset.x, y: e.target.dataset.y };
    return type === null ? addNewItem({ data, location: targetLocation }) : submitDelete(e);
  };

  return (
    <GridItemContainer>
      <Bullet
        draggable
        data-type={data.type}
        data-x={location.x}
        data-y={location.y}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={(e) => handleDrag(e, data)}
        onDrop={(e) => handleDrop(e, data)}
        onClick={(e) => checkGridEmpty(e)}
      >
        {data.type?.substring(0, 1)}
        {data.type && data.type === 'MEMBER' && data.member?.name}
      </Bullet>

      {isDeleteIconOn && (
        <IconWrapper onClick={onIconClick} tabIndex={0} onBlur={() => setDeleteIcon(false)}>
          <DeleteIcon width={1} height={1} rotate={0} />
        </IconWrapper>
      )}
    </GridItemContainer>
  );
};

GridItem.propTypes = {
  location: PropTypes.objectOf(PropTypes.number),
  data: PropTypes.object,
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
};

GridItem.defaultProps = {
  location: { x: 0, y: 0 },
  data: {},
  handleDrag: () => {},
  handleDrop: () => {},
};

// TODO: policy 등에 옮기기
const handleColorType = (type) => {
  switch (type) {
    case 'WINDOW_1' || 'WINDOW':
      return 'lightblue';
    case 'DESK':
      return 'lightpink';
    case 'MEMBER':
      return 'tomato';
    default:
      return 'white';
  }
};

const GridItemContainer = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => (props.color ? props.color : props.theme.primary8)};
  right: -2rem;
  top: -2rem;
  z-index: 10;
`;

const Bullet = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  text-align: center;
  cursor: pointer;
  background: ${({ type }) => handleColorType(type)};

  :hover {
    background: ${(props) => props.theme.primary8};
  }
`;

export default GridItem;
