import { Link, Typography } from '@mui/material';
import { Box, Grid, useTheme } from '@mui/system';
import React from 'react';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        paddingInline: 3,
        paddingTop: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '24px 24px 0 0',
          padding: '24px 54.5px',
        }}
      >
        <Grid container>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ paddingBottom: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  marginBottom: '12px',
                }}
              >
                About
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Why TidyMind
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Our Pricing
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
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
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  marginBottom: '12px',
                }}
              >
                Our Apps
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                iOS App
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Android App
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
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
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  marginBottom: '12px',
                }}
              >
                About Us
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Our Manifesto
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
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
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  marginBottom: '12px',
                }}
              >
                Help & Contact
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                @tidymind on Twitter
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Guides & Contact Form
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme.palette.text.secondary,
                  marginBottom: '8px',
                  cursor: 'pointer',

                  '&:hover': {
                    color: theme.palette.text.primary,
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
            borderTop: `1px solid ${theme.palette.border.default}`,
          }}
        >
          <Typography
            sx={{ fontSize: '14px', color: theme.palette.text.secondary, cursor: 'default' }}
          >
            © TidyMind, Inc. 2025
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
            <Link
              href="#"
              underline="none"
              sx={{
                fontSize: '14px',
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                fontSize: '14px',
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                fontSize: '14px',
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary,
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
