import { Link, Typography } from '@mui/material';
import { Box, Grid } from '@mui/system';
import React from 'react';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#e5ebf9',
        paddingInline: 3,
        paddingTop: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '24px 24px 0 0',
          padding: '24px 54.5px',
        }}
      >
        <Grid container>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ paddingBottom: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#0a0a0a',
                  marginBottom: '12px',
                }}
              >
                About
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Why TidyMind
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Our Pricing
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                How it Works
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ paddingBottom: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#0a0a0a',
                  marginBottom: '12px',
                }}
              >
                Our Apps
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                iOS App
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Android App
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Browser Extension
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ paddingBottom: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#0a0a0a',
                  marginBottom: '12px',
                }}
              >
                About Us
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Our Manifesto
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Our Promise
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ paddingBottom: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#0a0a0a',
                  marginBottom: '12px',
                }}
              >
                Help & Contact
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                @tidymind on Twitter
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Guides & Contact Form
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#737373',
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: '#0a0a0a',
                  },
                }}
              >
                Video Tutorials
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 3,
            borderTop: '1px solid #e5e5e5',
          }}
        >
          <Typography fontSize={'14px'} color="#737373" sx={{ cursor: 'default' }}>
            © TidyMind, Inc. 2025
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
            <Link
              href="#"
              underline="none"
              color="#737373"
              fontSize={'14px'}
              sx={{
                '&:hover': {
                  color: '#0a0a0a',
                },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              underline="none"
              color="#737373"
              fontSize={'14px'}
              sx={{
                '&:hover': {
                  color: '#0a0a0a',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              color="#737373"
              fontSize={'14px'}
              sx={{
                '&:hover': {
                  color: '#0a0a0a',
                },
              }}
            >
              FAQ
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
