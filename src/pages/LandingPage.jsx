import AddIcon from '@mui/icons-material/Add';
import { Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Mic } from 'lucide-react';
import { Image } from 'lucide-react';
import React from 'react';

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: ' column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#e5ebf9',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: ' column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          paddingInline: { xs: 5, md: 0 },
        }}
      >
        <Typography component="p" sx={{ textAlign: 'center', color: '#ff6801', marginBottom: 4 }}>
          TIDYMIND WORKS
        </Typography>
        <Typography component="h1" sx={{ textAlign: 'center', fontSize: 48, marginBottom: 4 }}>
          Drop your thoughts.
        </Typography>
        <Typography component="p" sx={{ textAlign: 'center', fontSize: 18, color: '#9b9697b3' }}>
          Every random note, every fleeting idea, TidyMind captures it all.
          <br />
          Instantly organized with tasks added to your calendar.
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          minHeight: '66px',
          maxHeight: '120px',
          width: '45%',
          border: '1px solid transparent',
          backgroundColor: '#f3f5fd',
          borderRadius: 8,
          overflow: 'hidden',
          padding: '16px 92px 48px 24px',
          transition: 'all 0.3s ease',
          '&:focus-within': {
            border: '1px solid #a1a1a1',
          },
        }}
      >
        <Input
          sx={{
            display: 'flex',
            alignItems: 'start',
            padding: 0,
            height: '66px',
            overflow: 'hidden',
            '& .MuiInputBase-input': {
              maxHeight: '66px',
              overflow: 'auto !important',
              fontSize: '14px',
              boxSizing: 'border-box',
              '&::placeholder': {
                fontSize: '14px',
                color: '#9ca3af',
                opacity: 1,
              },
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#d1d5db',
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor: '#9ca3af',
                },
              },
            },
          }}
          disableUnderline
          multiline
          placeholder="여기에 무엇이든 입력하세요... 정리는 맡겨주세요!"
        />

        <Box sx={{ position: 'absolute', bottom: '8px', left: '20px', display: 'flex', gap: 0.5 }}>
          <Button
            disableRipple
            sx={{
              minWidth: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '30px',
            }}
          >
            <Mic color="#737373" size={20} strokeWidth={1.5} />
          </Button>
          <Button
            disableRipple
            sx={{
              minWidth: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '30px',
            }}
          >
            <Image color="#737373" size={20} strokeWidth={1.5} />
          </Button>
        </Box>
        <Button
          disableRipple
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            minWidth: '36px',
            height: '36px',
            padding: 0,
            margin: 2,
            borderRadius: '30px',
            backgroundColor: '#c0ccf2',
            boxShadow: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#b0bbdfff',
            },
            '&:active': {
              transform: 'translateY(2px)',
            },
          }}
        >
          <AddIcon sx={{ width: '16px', fill: 'white' }} />
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
