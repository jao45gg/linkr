import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Hide scrollbar for Chrome, Safari, and Opera */
body::-webkit-scrollbar {
  width: 0.4em;
  background-color: #F5F5F5;
}

body::-webkit-scrollbar-thumb {
  background-color: #000000;
}

/* Hide scrollbar for IE, Edge, and Firefox */
body {
  scrollbar-width: thin;
  scrollbar-color: #000000 #F5F5F5;
}
`

export default GlobalStyle;