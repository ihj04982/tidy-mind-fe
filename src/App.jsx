import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

import { ToastProvider } from './hooks/useToast.jsx';
import AppRouter from './routes/AppRouter.jsx';
import ThemeRegistry from './theme/themeProvider.jsx';

function App() {
  return (
    <ThemeRegistry>
      <ToastProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AppRouter />
        </GoogleOAuthProvider>
      </ToastProvider>
    </ThemeRegistry>
  );
}

export default App;
