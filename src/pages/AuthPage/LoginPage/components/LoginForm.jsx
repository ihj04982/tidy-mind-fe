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
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { clearError, googleLogin, login } from '../../../../features/auth/authSlice';
import { useToast } from '../../../../hooks/useToast';
import { loginValidater } from '../../../../utils/validater';

export default function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 에러 메시지
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = loginValidater({ email, password, setErrors });
    if (!isValid) return;
    const response = await dispatch(login({ email, password }));
    if (login.fulfilled.match(response)) {
      dispatch(clearError());
      addToast('로그인 성공!', { severity: 'success' });
      navigate('/');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const response = await dispatch(googleLogin({ code: codeResponse.code }));

      if (googleLogin.fulfilled.match(response)) {
        dispatch(clearError());
        addToast('로그인 성공!', { severity: 'success' });
        navigate('/');
      }
    },
  });

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
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Error message */}
          {error && (
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '0.75rem',
                mt: '0.5rem',
                fontWeight: 400,
                color: theme.palette.text.error,
              }}
            >
              {error}
            </Typography>
          )}

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
            component={RouterLink}
            to="/register"
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
