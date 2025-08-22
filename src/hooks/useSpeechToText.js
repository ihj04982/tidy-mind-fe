import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeechToText = () => {
  const { listening, resetTranscript, finalTranscript } = useSpeechRecognition();

  const toggleListening = () => {
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
  };
};

export default useSpeechToText;
