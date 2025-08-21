import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import React from 'react';

const SearchBar = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: 280,
      height: 42,
      borderRadius: '25px',
      border: '1px solid #e0e0e0',
      px: 2,
      ml: 'auto',
      mb: 10,
    }}
  >
    <SearchIcon sx={{ color: '#9e9e9e', mr: 1 }} />
    <InputBase placeholder="Find Events" sx={{ flex: 1, fontSize: 14 }} />
  </Box>
);

export default SearchBar;
