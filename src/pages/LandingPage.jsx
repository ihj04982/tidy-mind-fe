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
        }}
      >
        <Typography component="p" sx={{ color: '#ff6801', marginBottom: 4 }}>
          TIDYMIND WORKS
        </Typography>
        <Typography component="h1" sx={{ fontSize: 48, marginBottom: 4 }}>
          Drop your thoughts.
        </Typography>
        <Typography component="p" sx={{ textAlign: 'center', fontSize: 18, color: '#9b9697b3' }}>
          Every random note, every fleeting idea, TidyMind captures it all.
          <br />
          Instantly organized with tasks added to your calendar.
        </Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Input
          disableUnderline
          multiline
          sx={{
            minHeight: '130px',
            width: '768px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            backgroundColor: '#f3f5fd',
            borderRadius: 8,
            padding: '16px 128px 16px 24px',
            fontSize: 14,
            outline: 'none',
            border: '1px solid transparent',
            transition: 'all 0.3s ease',
            '& textarea': {
              padding: 0,
              margin: 0,
              height: '100%',
              boxSizing: 'border-box',
              textAlign: 'start',
              verticalAlign: 'top',
              resize: 'none',
            },
            '&:focus-within': {
              border: '1px solid #a1a1a1',
            },
          }}
          placeholder="여기에 무엇이든 입력하세요... 정리는 맡겨주세요!"
        ></Input>
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
