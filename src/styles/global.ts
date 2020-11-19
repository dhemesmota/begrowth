import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.min.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #2a2e3a;
    color: #f2f5fe;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: 16px "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }

  .Toastify__toast {
    border-radius: 5px !important;
  }
`;
