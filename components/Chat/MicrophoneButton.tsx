import React, { FC, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { IconMicrophone } from '@tabler/icons-react';
interface Props {
  // handleMessageChange: (string)
}

const MicrophoneButton: FC<Props> = ({}) => {
  return (
    <button
      className="text-neutral-800 hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
    >
      <IconMicrophone />
    </button>
  )
}


export default MicrophoneButton;