import { createGlobalStyle } from 'styled-components';

export const theme = {
  green: '#2a9d8f',
  yellow: '#e9c46a',
  red: '#e76f51',
  orange: '#f4a261',
  black: '#264653',
  lightPurple: '#C6D0FF',
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:400,799');
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans JP', sans-serif;
    font-weight: 100;
  }
  a {
    text-decoration: none;
  }
  ul {
    margin: 0 auto;
    list-style-type: none;
  }
`;
