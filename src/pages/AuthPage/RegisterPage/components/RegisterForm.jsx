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
  useTheme,
} from '@mui/material';

export default function RegisterForm() {
  const theme = useTheme();

  const [name, setName] = useState('');
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

  const textFieldProps = {
    input: {
      sx: {
        height: 36,
        fontSize: 14,
        borderRadius: '8px',
        background: theme.palette.background.default,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.border.strong,
        },
      },
    },
  };

  return (
    <Card
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        backdropFilter: 'blur(6px)',
        borderRadius: '12px',
        px: '16px',
        py: { xs: '20px', md: '32px' },
        border: `1px solid ${theme.palette.border.default}`,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ textAlign: 'center', mb: '24px' }}>
          <Typography
            sx={{
              fontSize: { xs: '18px', md: '20px' },
              mb: '4px',
              fontWeight: 400,
              color: theme.palette.text.primary,
            }}
          >
            Create account
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '12px', md: '14px' },
              color: theme.palette.text.secondary,
            }}
          >
            Join TidyMind to organize your thoughts
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            slotProps={textFieldProps}
          />

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
            slotProps={textFieldProps}
            sx={{ mt: 1 }}
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
            slotProps={textFieldProps}
            sx={{ mt: 1 }}
          />
          <span
            style={{
              fontSize: '14px',
              color: theme.palette.text.secondary,
            }}
          >
            Must be at least 8 characters
          </span>

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
              background: theme.palette.primary,
              color: theme.palette.primary.contrastText,
              textTransform: 'none',
              transition: 'opacity 0.2s ease',
              '&:hover': { background: theme.palette.primary, opacity: 0.9 },
              '&.Mui-disabled': { opacity: 0.5 },
            }}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>

          {/* Divider */}
          <Box sx={{ position: 'relative', my: '4px' }}>
            <Divider
              sx={{
                borderColor: theme.palette.border.default,
              }}
            >
              <span
                style={{
                  padding: '0 8px',
                  fontSize: '12px',
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
              mt: '8px',
              height: '32px',
              fontSize: '14px',
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              borderColor: theme.palette.border.default,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                background: theme.palette.background.paper,
              },
            }}
          >
            Continue with Google
          </Button>
        </form>

        {/* Sign in */}
        <Typography
          component="p"
          sx={{
            textAlign: 'center',
            mt: '16px',
            fontSize: '12px',
            color: theme.palette.text.secondary,
          }}
        >
          {`Already have an account? `}
          <Link
            href="/login"
            underline="none"
            sx={{
              fontWeight: 600,
              transition: 'color 0.2s ease',
              color: theme.palette.text.accent,
              '&:hover': { color: theme.palette.text.primary },
            }}
          >
            Sign in
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
