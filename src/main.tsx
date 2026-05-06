import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import type { CSSVariablesResolver } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.scss';
import { App } from './components/App/App';

const theme = createTheme({
  primaryColor: 'teal',
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--primary': theme.colors.teal[6],
    '--primary-light': theme.colors.teal[0],
    '--primary-dark': theme.colors.teal[8],
    '--text': theme.black,
    '--text-secondary': theme.colors.gray[6],
    '--bg': theme.white,
    '--bg-subtle': theme.colors.gray[0],
    '--border': theme.colors.gray[2],
  },
  dark: {
    '--primary': theme.colors.teal[4],
    '--primary-light': theme.colors.teal[9],
    '--primary-dark': theme.colors.teal[2],
    '--text': theme.colors.dark[0],
    '--text-secondary': theme.colors.gray[4],
    '--bg': theme.colors.dark[7],
    '--bg-subtle': theme.colors.dark[6],
    '--border': theme.colors.dark[4],
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
);
