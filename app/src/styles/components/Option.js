import styled from 'styled-components';

const StyledOption = styled.li`
  background-color: ${props => props.color || '#f2f2f2' };
  padding: 1rem;
`

export default StyledOption;