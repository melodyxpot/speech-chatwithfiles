import { IconSpeakerphone } from '@tabler/icons-react';
import { FC } from 'react';

type Props = {
  speaking: boolean;
  speechOnToggle: () => void;
};

export const SpeechButton: FC<Props> = ({ speaking, speechOnToggle }) => (
  <button
    className={`absolute ${
      window.innerWidth < 640
        ? 'right-9 bottom-1'
        : 'right-[-40px] top-[26px] m-0'
    }`}
  >
    {speaking ? (
      <IconSpeakerphone 
        size={20} 
        className="text-green-500 dark:text-green-400"
        onClick={speechOnToggle}
        color={'#ffffff'}
      />
    ) : (
      <IconSpeakerphone 
        size={20}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        onClick={speechOnToggle}
      />
    )}
  </button>
);
