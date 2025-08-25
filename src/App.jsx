import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

import AppRouter from './routes/AppRouter.jsx';
import ThemeRegistry from './theme/themeProvider.jsx';

function App() {
  return (
    <ThemeRegistry>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AppRouter />
      </GoogleOAuthProvider>
    </ThemeRegistry>
  );
}

export default App;
