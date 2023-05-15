import React, { FC, useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { IconMicrophone } from '@tabler/icons-react'

interface ISpeechRecognition {
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  listening: boolean;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition: boolean;
  isMicrophoneAvailable: boolean;
}

interface Props {
  // handleMessageChange: (string)
}

const MicrophoneButton: FC<Props> = ({}) => {

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    }: ISpeechRecognition = useSpeechRecognition();

    // useEffect(() => {
    //   SpeechRecognition.stopListening();  
    // }, []);

    // useEffect(() => {
    //   console.log(transcript);
    // }, [transcript]);

    // if (!browserSupportsSpeechRecognition) {
    //   alert("Speech is not enabled");
    // }

    const speechToggle = () => {
      if (listening === true) {
        SpeechRecognition.startListening();
      } else {
        SpeechRecognition.stopListening();
      }
    }

  return (
    <button
      className="absolute right-3 rounded-sm p-1 text-neutral-800 hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
      onClick={speechToggle}
    >   
      <IconMicrophone 
        size={25}
        // color={listening ? 'black' : 'white'} 
        className="opacity-60" 
      />
    </button>
  )
}


export default MicrophoneButton;