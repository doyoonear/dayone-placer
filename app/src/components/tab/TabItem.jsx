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
      <TabTitle key={room.id} id={room.id} onClick={() => handleRoom(room.id)} hasSuperPermission={hasSuperPermission}>
        {room.title}
      </TabTitle>

      {hasSuperPermission && (
        <TabArrow onClick={() => handleOptionModal(room, tabContainer.current.getBoundingClientRect())}>
          <ArrowIcon width={0.6} height={0.6} rotate={90} />
        </TabArrow>
      )}
    </TabContainer>
  );
};

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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  max-width: 20rem;
  padding: 10px;
  font-size: 13px;
`;

const TabArrow = styled.div`
  padding-right: 10px;
`;

export default TabItem;
