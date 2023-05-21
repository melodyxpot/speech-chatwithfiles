import React, { FC, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { IconMicrophone } from '@tabler/icons-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
interface Props {
  handleMessageChange: (text: string) => void
}

const MicrophoneButton: FC<Props> = ({handleMessageChange}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    // handleMessageChange(transcript);  
  }, [transcript]);

  console.log(`SpeechRecognition Support :=> ${browserSupportsSpeechRecognition}`);

  console.log(transcript, listening)

  return (
    <button
      className="text-neutral-800 hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
      onMouseDown={() => SpeechRecognition.startListening()}
      onMouseUp={() => SpeechRecognition.stopListening()}
    >
      <IconMicrophone />
    </button>
  )
}


export default MicrophoneButton;