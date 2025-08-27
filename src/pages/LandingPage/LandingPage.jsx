import AddIcon from '@mui/icons-material/Add';
import { Button, CircularProgress, Input, Typography, useTheme } from '@mui/material';
import { Box, keyframes } from '@mui/system';
import { Circle, Image, Mic, Square, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createNoteWithSuggestion } from '../../features/notes/noteSlice';
import { toastCleared } from '../../features/toast/toastSlice';
import useSpeechToText from '../../hooks/useSpeechToText';
import CloudinaryUploadWidget from '../../utils/CloudinaryUploadWidget';

const LandingPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: isSaving, error } = useSelector((state) => state.notes);

  const {
    transcript,
    listening,
    toggleListening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechToText();
  const [inputValue, setInputValue] = useState('');
  const [imgURLs, setImgURLs] = useState([]);
  const MAX_IMAGE_COUNT = 5;

  useEffect(() => {
    dispatch(toastCleared());
  }, [dispatch]);

  useEffect(() => {
    if (transcript) {
      setInputValue((prev) => prev + transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (error && error.includes('로그인')) {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (listening || isSaving) return;

    const hasContent = inputValue.trim().length > 0;
    const hasImages = imgURLs.length > 0;

    if (hasContent || hasImages) {
      const result = await dispatch(
        createNoteWithSuggestion({
          content: inputValue.trim(),
          images: imgURLs,
        }),
      );

      if (createNoteWithSuggestion.fulfilled.match(result)) {
        setInputValue('');
        setImgURLs([]);

        setTimeout(() => {
          navigate('/collections');
        }, 2000);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const uploadImage = (url) => {
    if (imgURLs.length < MAX_IMAGE_COUNT) {
      setImgURLs((prev) => [...prev, url]);
    }
  };

  const removeImage = (index) => {
    setImgURLs((prev) => prev.filter((_, i) => i !== index));
  };

  const wave = keyframes`
  0%, 100% {
    height: 2px;
    opacity: 0.4;
  }
  50% {
    height: 1rem;
    opacity: 1;
  }
`;

  const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: ' column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        background: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: ' column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingInline: '1rem',
          marginBottom: 5,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: 900,
            letterSpacing: 2,
            color: theme.palette.text.accent,
            marginBottom: 4,
          }}
        >
          TIDYMIND WORKS
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { md: 48, xs: 36 },
            marginBottom: 4,
          }}
        >
          Drop your thoughts.
        </Typography>
        <Typography
          component="p"
          sx={{ textAlign: 'center', fontSize: 18, color: theme.palette.text.secondary }}
        >
          Every random note, every fleeting idea, TidyMind captures it all.
          <br />
          Instantly organized with tasks added to your calendar.
        </Typography>
      </Box>

      {imgURLs.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            marginBottom: '0.75rem',
          }}
        >
          {imgURLs.map((url, index) => (
            <Box key={index} sx={{ position: 'relative', width: '80px', height: '80px' }}>
              <Box
                component="img"
                src={url}
                alt={`img-${index}`}
                sx={{
                  objectFit: 'cover',
                  width: 80,
                  height: 80,
                  borderRadius: '0.5rem',
                  boxShadow: '0 0 6px #00000011',
                }}
              />
              <Button
                onClick={() => removeImage(index)}
                sx={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '-0.5rem',
                  minWidth: '1.5rem',
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '2rem',
                  padding: 0,
                  background: theme.palette.text.accent,
                }}
              >
                <X size={12} color={theme.palette.background.paper} />
              </Button>
            </Box>
          ))}
          {MAX_IMAGE_COUNT - imgURLs.length > 0 && (
            <CloudinaryUploadWidget uploadImage={uploadImage}>
              {(openWidget) => (
                <Button
                  onClick={openWidget}
                  sx={{
                    height: '80px',
                    width: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: `1px dashed ${theme.palette.border.strong}`,
                    margin: '0 1rem ',
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    color: theme.palette.text.secondary,
                  }}
                >
                  + Add {MAX_IMAGE_COUNT - imgURLs.length} more
                </Button>
              )}
            </CloudinaryUploadWidget>
          )}
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          height: '120px',
          width: { xs: '80%', md: '60%', lg: '55%', xl: '45%' },
          border: `1px solid ${listening ? theme.palette.text.accent : 'transparent'}`,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f3f5fd',
          borderRadius: 8,
          overflow: 'hidden',
          padding: '16px 92px 48px 24px',
          marginBottom: 10,
          transition: 'all 0.3s ease',
          '&:focus-within': {
            border: `1px solid ${theme.palette.border.strong}`,
          },
        }}
      >
        {listening && (
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: '0.625rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ animation: `${pulse} 1.5s ease-in-out infinite` }}>
                <Circle size={12} fill="#FF6900" color="none" />
              </Box>
              <Typography
                sx={{ fontSize: '0.75rem', color: theme.palette.text.accent, marginRight: 2 }}
              >
                Recording...
              </Typography>
            </Box>
            {Array.from({ length: 15 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  marginRight: 0.3,
                  width: '2px',
                  height: '1rem',
                  bgcolor: theme.palette.text.accent,
                  borderRadius: '2px',
                  animation: `${wave} 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </Box>
        )}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={listening && true}
          sx={{
            display: `${listening ? 'none' : 'flex'}`,
            alignItems: 'start',
            padding: 0,
            height: '66px',
            width: '100%',
            overflow: 'hidden',
            '& .MuiInputBase-input': {
              maxHeight: '66px',
              overflow: 'auto !important',
              fontSize: '14px',
              boxSizing: 'border-box',
              '&::placeholder': {
                fontSize: '14px',
                color: theme.palette.text.secondary,
                opacity: 1,
              },
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor:
                  theme.palette.mode === 'dark' ? theme.palette.border.default : '#d1d5db',
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark' ? theme.palette.border.strong : '#9ca3af',
                },
              },
            },
          }}
          disableUnderline
          multiline
          rows={3}
          placeholder={listening ? '' : '여기에 무엇이든 입력하세요... 정리는 맡겨주세요!'}
        />

        {listening ? (
          <Box
            sx={{ position: 'absolute', bottom: '8px', left: '20px', display: 'flex', gap: 0.5 }}
          >
            <Box
              onClick={toggleListening}
              sx={{
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '30px',
                background: theme.palette.text.accent,
                cursor: 'pointer',
              }}
            >
              <Square color="#fff" fill="#fff" size={16} strokeWidth={1.5} />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              bottom: '8px',
              left: '20px',
              display: 'flex',
              gap: 0.5,
            }}
          >
            <Button
              disabled={listening || !browserSupportsSpeechRecognition || !isMicrophoneAvailable}
              onClick={toggleListening}
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
            <CloudinaryUploadWidget uploadImage={uploadImage}>
              {(openWidget) => (
                <Button
                  onClick={openWidget}
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
              )}
            </CloudinaryUploadWidget>
          </Box>
        )}
        <Button
          onClick={handleSubmit}
          disabled={listening || isSaving || (!inputValue.trim() && imgURLs.length === 0)}
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
            backgroundColor: isSaving ? '#a0aacf' : '#c0ccf2',
            boxShadow: '0 0 3px #0000003c',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#b0bbdfff',
            },
            '&:active': {
              transform: 'translateY(2px)',
            },
            '&:disabled': {
              backgroundColor: '#d2d2d2ff',
            },
          }}
        >
          {isSaving ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress size={16} sx={{ color: 'white' }} />
            </Box>
          ) : (
            <AddIcon sx={{ width: '16px', fill: 'white' }} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
