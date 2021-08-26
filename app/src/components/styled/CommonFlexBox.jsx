import styled from 'styled-components';

const CommonFlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  flex-direction: ${(props) => props.direction || 'row'};
`;

export default CommonFlexBox;
