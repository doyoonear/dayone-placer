import styled from 'styled-components';

const CommonIconContainer = styled.div`
  width: ${(props) => props.width || '1'}rem;
  height: ${(props) => props.height || '1'}rem;
  transform: ${(props) => `rotate(${props.rotate}deg)` || '0'};
`;

export default CommonIconContainer;
