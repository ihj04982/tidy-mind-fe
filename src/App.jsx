import React from 'react';

import AppRouter from './routes/AppRouter.jsx';
import ThemeRegistry from './theme/themeProvider.jsx';

function App() {
  return (
    <ThemeRegistry>
      <AppRouter />
    </ThemeRegistry>
  );
}

export default App;
