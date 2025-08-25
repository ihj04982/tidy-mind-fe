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

import { clearError, googleLogin, register } from '../../../../features/auth/authSlice';
import { registerValidater } from '../../../../utils/validater';

export default function RegisterForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  // form 데이터
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 에러 메시지
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = registerValidater({ name, email, password, confirmPassword, setErrors });
    if (!isValid) return;
    const response = await dispatch(register({ name, email, password }));
    if (register.fulfilled.match(response)) {
      dispatch(clearError());
      navigate('/login');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const response = await dispatch(googleLogin({ code: codeResponse.code }));

      if (googleLogin.fulfilled.match(response)) {
        dispatch(clearError());
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
            Create account
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              color: theme.palette.text.secondary,
            }}
          >
            Join TidyMind to organize your thoughts
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <TextField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
          />
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
            sx={{ mt: '0.25rem' }}
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

          {/* Confirm Password */}
          <TextField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            sx={{ mt: '0.25rem' }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
            disabled={isLoading || !name || !email || !password || !confirmPassword}
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
            {isLoading ? 'Signing up...' : 'Sign up'}
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

        {/* Sign in */}
        <Typography
          component="p"
          sx={{
            textAlign: 'center',
            mt: '1rem',
            fontSize: '0.75rem',
            color: theme.palette.text.secondary,
          }}
        >
          {`Already have an account? `}
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={{
              fontWeight: 600,
              color: 'text.accent',
              '&:hover': { color: 'text.primary' },
            }}
          >
            Sign in
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
