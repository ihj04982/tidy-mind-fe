import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

export default function LoginForm() {
  const theme = useTheme();

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
        background: theme.palette.background.paper,
        backdropFilter: 'blur(6px)',
        borderRadius: '0.75rem',
        px: '1rem',
        py: { xs: '1.25rem', md: '2rem' },
        border: `1px solid ${theme.palette.border.default}`,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ textAlign: 'center', mb: '1.5rem' }}>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              mb: '0.25rem',
              fontWeight: 400,
              color: theme.palette.text.primary,
            }}
          >
            Welcome back
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              color: theme.palette.text.secondary,
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
            sx={{ mt: '0.25rem' }}
          />

          {/* Forgot password */}
          <Box sx={{ textAlign: 'right', mt: '0.375rem' }}>
            <Link
              href="/forgot-password"
              underline="none"
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.text.secondary,
                '&:hover': { color: theme.palette.text.primary },
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
              mt: '1rem',
              height: '2rem',
              fontSize: '0.875rem',
              borderRadius: '0.625rem',
              fontWeight: 600,
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': { background: theme.palette.primary, opacity: 0.9 },
              '&.Mui-disabled': { opacity: 0.5 },
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          {/* Divider */}
          <Box sx={{ position: 'relative', my: '0.25rem' }}>
            <Divider
              sx={{
                borderColor: theme.palette.border.default,
              }}
            >
              <span
                style={{
                  padding: '0 0.5rem',
                  fontSize: '0.75rem',
                  color: theme.palette.text.secondary,
                }}
              >
                OR CONTINUE WITH
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
              mt: '0.5rem',
              height: '2rem',
              fontSize: '0.875rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              borderColor: theme.palette.border.default,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              '&:hover': {
                background: theme.palette.background.paper,
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
            mt: '1rem',
            fontSize: '0.75rem',
            color: theme.palette.text.secondary,
          }}
        >
          {`Don't have an account? `}
          <Link
            href="/register"
            underline="none"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.accent,
              '&:hover': { color: theme.palette.text.primary },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
