import { useDispatch } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { showToast } from '../features/toast/toastSlice';

const useSpeechToText = () => {
  const dispatch = useDispatch();
  const { listening, resetTranscript, finalTranscript } = useSpeechRecognition();

  // 브라우저 정보
  const userAgent = navigator.userAgent;
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent) && !/Edg/.test(userAgent);

  const isBrowserSupported = !!window.SpeechRecognition || !!window.webkitSpeechRecognition;

  const toggleListening = async () => {
    // 브라우저 지원 확인
    if (!isBrowserSupported) {
      dispatch(
        showToast({
          message: '이 브라우저는 음성 인식을 지원하지 않습니다.',
          severity: 'error',
        }),
      );
      return;
    }

    // Safari 안내 (지원 제한)
    if (isSafari) {
      dispatch(
        showToast({
          message:
            'Safari에서는 음성 인식 기능이 제한적으로만 작동합니다. Chrome 사용을 권장합니다.',
          severity: 'warning',
        }),
      );
    }

    // HTTPS 확인
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      dispatch(
        showToast({
          message: '음성 인식은 HTTPS 환경에서만 사용할 수 있습니다.',
          severity: 'error',
        }),
      );
      return;
    }

    if (listening) {
      try {
        SpeechRecognition.stopListening();
      } catch (error) {
        dispatch(
          showToast({
            message: `음성 인식 중지 오류: ${error}`,
            severity: 'error',
          }),
        );
      }
    } else {
      try {
        // 마이크 권한 명시적 요청
        await navigator.mediaDevices.getUserMedia({ audio: true });

        resetTranscript();

        // 실제 startListening 시도
        SpeechRecognition.startListening({
          language: 'ko-KR',
          continuous: true,
          interimResults: true,
        });

        // Safari / 제한적 지원 브라우저에서 실패 감지
        SpeechRecognition.onstart = () => console.log('Speech recognition started');
        SpeechRecognition.onerror = (event) => {
          dispatch(
            showToast({
              message: `음성 인식 실패: ${event.error}`,
              severity: 'error',
            }),
          );
        };
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          dispatch(
            showToast({
              message: '마이크 권한이 필요합니다. 브라우저 설정에서 허용해주세요.',
              severity: 'error',
            }),
          );
        } else if (error.name === 'NotFoundError') {
          dispatch(
            showToast({
              message: '마이크를 찾을 수 없습니다.',
              severity: 'error',
            }),
          );
        } else {
          dispatch(
            showToast({
              message: `음성 인식을 시작할 수 없습니다: ${error.message}`,
              severity: 'error',
            }),
          );
        }
      }
    }
  };

  return {
    transcript: finalTranscript,
    listening,
    toggleListening,
    resetTranscript,
  };
};

export default useSpeechToText;
