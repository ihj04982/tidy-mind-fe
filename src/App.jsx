import React from 'react';
import ThemeRegistry from './themeProvider';
import RegisterPage from './pages/AuthPage/RegisterPage/RegisterPage';

function App() {
  return (
    <>
      <ThemeRegistry>
        <RegisterPage />
      </ThemeRegistry>
    </>
  );
}

export default App;
