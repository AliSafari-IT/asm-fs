import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';

const AppWithRouter = () => (
  <ThemeProvider>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
);

export default AppWithRouter;