import { type ChangeEvent, type KeyboardEvent, type JSX } from 'react';

interface Props {
  label: string;
  value: string;
  min: number;
  max: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function SettingsInput(props: Props): JSX.Element {
  return (
    <label className="settings-input">
      <span className="settings-input-label">{props.label}</span>
      <input
        className="settings-input-field"
        type="number"
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onBlur={props.onBlur}
      />
    </label>
  );
}
