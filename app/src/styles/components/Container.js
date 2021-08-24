import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: ${props => props.color || '#fcfcfc' };
  padding: 1rem;
`

export default StyledContainer;