import { Button, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FolderOpen, Calendar } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const LeftNavigation = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '80px',
        height: '100vh',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 4,
        background: theme.palette.background.paper,

        boxShadow: 1,
        borderRight: `1px solid ${theme.palette.border.default}`,
        zIndex: 999,
      }}
    >
      <Box
        onClick={() => navigate('/')}
        component="img"
        src={Logo}
        alt="logo"
        sx={{
          width: 24,
          marginTop: 7,
          marginBottom: 1.5,
          cursor: 'pointer',
        }}
      />
      <Button
        disableRipple
        onClick={() => navigate('/collections')}
        sx={{ padding: 0, color: theme.palette.text.primary }}
      >
        <FolderOpen width={23} cursor={'pointer'} />
      </Button>
      <Button
        disableRipple
        onClick={() => navigate('/calendar')}
        sx={{ padding: 0, color: theme.palette.text.primary }}
      >
        <Calendar width={23} cursor={'pointer'} />
      </Button>
    </Box>
  );
};

export default LeftNavigation;
