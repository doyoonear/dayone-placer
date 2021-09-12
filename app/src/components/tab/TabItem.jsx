import React, { useRef } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../icons/ArrowIcon';
import { ACCOUNT_PERMISSION } from '../../common/policy';

const TabItem = ({ room, handleRoom, selectedRoomId, handleOptionModal, accountLevel }) => {
  const tabContainer = useRef();

  const hasSuperPermission = () => {
    return Number(accountLevel) === ACCOUNT_PERMISSION.ALL;
  };

  return (
    <TabContainer id={room.id} selectedRoomId={selectedRoomId} ref={tabContainer}>
      <StEllipsis>
        <TabTitle
          key={room.id}
          id={room.id}
          onClick={() => handleRoom(room.id)}
          hasSuperPermission={hasSuperPermission}
        >
          {room.title}
        </TabTitle>
      </StEllipsis>
      {hasSuperPermission && (
        <TabArrow onClick={() => handleOptionModal(room, tabContainer.current.getBoundingClientRect())}>
          <ArrowIcon width={0.8} height={0.8} rotate={90} />
        </TabArrow>
      )}
    </TabContainer>
  );
};

const StEllipsis = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  line-height: 14px;
  height: 25px;
  max-width: 20rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: ${({ theme, hasSuperPermission }) => (hasSuperPermission ? 'none;' : `1px solid ${theme.grey4}`)};
  background: ${(props) => (props.id === props.selectedRoomId ? props.theme.primary6 : props.theme.grey2)};

  :hover {
    background: ${(props) => props.theme.primary4};
  }
`;

const TabTitle = styled.p`
  padding: 10px;
  font-size: 13px;
  height: 100%;
`;

const TabArrow = styled.p`
  padding-right: 10px;
`;

export default TabItem;
