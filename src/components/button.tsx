import type { JSX } from 'react';
import ButtonSound from '../sounds/button_click.mp3';

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
}

const buttonAudio = new Audio(ButtonSound);

function playButtonSound(): void {
  buttonAudio.currentTime = 0.3;
  buttonAudio.play().catch(() => {});
}

export function Button(props: Props): JSX.Element {
  return (
    <button
      onClick={() => {
        playButtonSound();
        props.onClick?.();
      }}
      className={props.className}
    >
      {props.text}
    </button>
  );
}
