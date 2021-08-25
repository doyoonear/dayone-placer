import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, html, body{
    box-sizing:border-box;
    
    &:focus {
      outline: none;
    }
  }

  li {
    list-style: none;
  }

  a,
  button {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  button {
    border: none;
  }
`;

export default GlobalStyle;
