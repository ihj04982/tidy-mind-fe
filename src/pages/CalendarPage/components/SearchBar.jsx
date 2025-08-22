import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, useTheme } from '@mui/material';
import React from 'react';

const SearchBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: '17.5rem' },
        height: '2.625rem',
        borderRadius: '1.5625rem',
        border: `1px solid ${theme.palette.border.default}`,
        px: 2,
        ml: 'auto',
        mb: 4,
      }}
    >
      <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
      <InputBase placeholder="Find Events" sx={{ flex: 1, fontSize: '0.875rem' }} />
    </Box>
  );
};

export default SearchBar;
