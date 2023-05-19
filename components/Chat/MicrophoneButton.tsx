import React, { FC, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { IconMicrophone } from '@tabler/icons-react';
import useSpeechToText from 'react-hook-speech-to-text';
interface Props {
  // handleMessageChange: (string)
}

const MicrophoneButton: FC<Props> = ({}) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  console.log(interimResult, results)

  return (
    <button
      className="text-neutral-800 hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
      onClick={isRecording ? stopSpeechToText : startSpeechToText}
    >
      <IconMicrophone />
    </button>
  )
}


export default MicrophoneButton;