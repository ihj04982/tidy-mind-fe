import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false; // 필요 시 로딩 상태 연결

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login');
  };

  const handleGoogleLogin = async () => {
    console.log('Google login');
  };

  return (
    <Card
      elevation={0}
      sx={{
        background: '#FFFFFF',
        backdropFilter: 'blur(6px)',
        borderRadius: '12px',
        px: '16px',
        py: { xs: '20px', md: '32px' },
        border: '1px solid #e5e7eb',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ textAlign: 'center', mb: '24px' }}>
          <Typography
            sx={{
              fontSize: { xs: '18px', md: '20px' },
              mb: '4px',
              fontWeight: 400,
              color: '#0a0a0a',
            }}
          >
            Welcome back
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '12px', md: '14px' },
              color: '#737373',
            }}
          >
            Sign in to your TidyMind account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            autoComplete="email"
            slotProps={{
              input: {
                sx: {
                  height: 36,
                  fontSize: 14,
                  borderRadius: '8px',
                  background: '#E8EBFA',
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e5e7eb',
                    },
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e5e7eb',
                  },
                },
              },
            }}
          />

          {/* Password */}
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            autoComplete="current-password"
            slotProps={{
              input: {
                sx: {
                  height: 36,
                  fontSize: 14,
                  borderRadius: '8px',
                  background: '#E8EBFA',
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e5e7eb',
                    },
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e5e7eb',
                  },
                },
              },
            }}
          />

          {/* Forgot password */}
          <Box sx={{ textAlign: 'right', mt: '6px' }}>
            <Link
              href="/forgot-password"
              underline="none"
              sx={{
                fontSize: '14px',
                color: '#6b7280',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#0a0a0a' },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading || !email || !password}
            sx={{
              mt: '16px',
              height: '32px',
              fontSize: '14px',
              borderRadius: '10px',
              fontWeight: 600,
              background: '#0a0a0a',
              color: '#E8EBFA',
              textTransform: 'none',
              transition: 'opacity 0.2s ease',
              '&:hover': { background: '#0a0a0a', opacity: 0.9 },
              '&.Mui-disabled': { opacity: 0.5 },
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          {/* Divider */}
          <Box sx={{ position: 'relative', my: '4px' }}>
            <Divider
              sx={{
                borderColor: '#e5e7eb',
                '&::before, &::after': { borderColor: '#e5e7eb' },
              }}
            >
              <span
                style={{
                  padding: '0 8px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  color: '#737373',
                }}
              >
                Or continue with
              </span>
            </Divider>
          </Box>

          {/* Google */}
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
            sx={{
              mt: '8px',
              height: '32px',
              fontSize: '14px',
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              borderColor: '#e5e7eb',
              background: '#E8EBFA',
              color: '#0a0a0a',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                borderColor: '#e5e7eb',
                background: '#ffffff',
              },
            }}
          >
            Continue with Google
          </Button>
        </form>

        {/* Sign up */}
        <Typography
          component="p"
          sx={{
            textAlign: 'center',
            mt: '16px',
            fontSize: '12px',
            color: '#737373',
          }}
        >
          {`Don't have an account? `}
          <Link
            href="/signup"
            underline="none"
            sx={{
              fontWeight: 600,
              transition: 'color 0.2s ease',
              color: '#FF6900',
              '&:hover': { color: '#0a0a0a' },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
