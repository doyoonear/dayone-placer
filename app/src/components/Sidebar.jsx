import React from 'react';
import styled from 'styled-components';

function Sidebar() {
  return (
    <StyledSidebar>
      <StyledName>이름</StyledName>
      <div />
    </StyledSidebar>
  );
}

const StyledName = styled.div`
  color: black;
`;

const StyledSidebar = styled.div`
  background-color: $primary;
  width: 10rem;
  height: 100%;
`;

export default Sidebar;
