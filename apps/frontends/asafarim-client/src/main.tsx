import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './index.scss';
import AppWithRouter from './AppWithRouter';
import { ThemeProvider } from './hooks/useTheme';
//import { ThemeProvider } from "@material-tailwind/react";
initializeIcons();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
          <AppWithRouter />
    </ThemeProvider>
  </React.StrictMode>
);
