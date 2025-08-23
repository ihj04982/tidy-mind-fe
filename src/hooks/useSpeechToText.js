import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeechToText = () => {
  const {
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const toggleListening = () => {
    if (!isMicrophoneAvailable) {
      return alert('마이크 사용 권한 제한됨.');
    }
    if (!browserSupportsSpeechRecognition) {
      return alert('마이크 사용 불가한 브라우저입니다.');
    }
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        language: 'ko-KR',
        continuous: true,
      });
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      language: 'ko-KR',
      continuous: true,
      interimResults: true,
    });
  };

  return {
    transcript: finalTranscript,
    listening,
    toggleListening,
    stopListening,
    startListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  };
};

export default useSpeechToText;
