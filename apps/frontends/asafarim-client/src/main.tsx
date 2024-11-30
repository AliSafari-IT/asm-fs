import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from './hooks/useTheme';
import './index.scss';


initializeIcons();

const AppWithRouter = () => (
  <ThemeProvider>
    <Router >
      <App />
    </Router>
  </ThemeProvider>

)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
);
