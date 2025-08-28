import { Button, Tooltip, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FolderOpen, Calendar } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import LogoDark from '../../assets/logo.png';
import LogoLight from '../../assets/tm_side_white.png';

const LeftNavigation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === 'dark';

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
        src={isDarkMode ? LogoLight : LogoDark}
        alt="logo"
        sx={{
          width: 24,
          marginTop: 7,
          marginBottom: 1.5,
          cursor: 'pointer',
        }}
      />
      <Tooltip
        title="Collections"
        placement="right"
        arrow
        sx={{
          '& .MuiTooltip-tooltip': {
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[700],
            color: theme.palette.common.white,
            padding: '6px 12px',
            borderRadius: '6px',
          },
          '& .MuiTooltip-arrow': {
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[700],
          },
        }}
      >
        <Button
          disableRipple
          onClick={() => navigate('/collections')}
          sx={{ padding: 0, color: theme.palette.text.primary }}
        >
          <FolderOpen width={23} cursor={'pointer'} />
        </Button>
      </Tooltip>
      <Tooltip
        title="Calendar"
        placement="right"
        arrow
        sx={{
          '& .MuiTooltip-tooltip': {
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[700],
            color: theme.palette.common.white,
            fontSize: '12px',
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: '6px',
          },
          '& .MuiTooltip-arrow': {
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[700],
          },
        }}
      >
        <Button
          disableRipple
          onClick={() => navigate('/calendar')}
          sx={{ padding: 0, color: theme.palette.text.primary }}
        >
          <Calendar width={23} cursor={'pointer'} />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default LeftNavigation;
