import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './index.scss';
import AppWithRouter from './AppWithRouter';
//import { ThemeProvider } from './hooks/useTheme';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
//import { ThemeProvider } from "@material-tailwind/react";
import { FluentProvider } from '@fluentui/react-components';
initializeIcons();
const theme = AzureDarkTheme; 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider  theme={theme}>      
          <AppWithRouter />
    </FluentProvider>
  </React.StrictMode>
);
