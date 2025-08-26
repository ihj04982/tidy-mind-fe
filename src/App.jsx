import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hydrate } from './features/auth/authSlice.js';
import AppRouter from './routes/AppRouter.jsx';
import ThemeRegistry from './theme/themeProvider.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  return (
    <ThemeRegistry>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AppRouter />
      </GoogleOAuthProvider>
    </ThemeRegistry>
  );
}

export default App;
