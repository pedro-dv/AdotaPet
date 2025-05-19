import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset básico */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f9fafb;
    color: #111827;
    line-height: 1.6;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: #2563eb;
    transition: color 0.3s ease;

    &:hover {
      color: #1e40af;
    }
  }

  button {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #2563eb;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1e40af;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #fff;
    color: #111827;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #2563eb;
      outline: none;
    }
  }

  ::selection {
    background-color:hsl(212, 96.40%, 78.40%);
    color: #111827;
  }

  html {
    scroll-behavior: smooth;
  }
`;

export default GlobalStyles;

