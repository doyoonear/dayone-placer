import styled from 'styled-components';

const CommonIconBox = styled.div`
  width: ${(props) => props.width || '1'}rem;
  height: ${(props) => props.height || '1'}rem;
  transform: ${(props) => `rotate(${props.rotate}deg)` || '0'};
  transition: transform 0.3s;
  color: ${(props) => props.color};
`;

export default CommonIconBox;
