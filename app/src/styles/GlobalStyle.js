import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, html, body{
    box-sizing:border-box;
    font-family: 'Noto Sans KR', 'Helvetica Neue', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
    
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
