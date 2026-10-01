import { useRef, useState, type KeyboardEvent, type JSX } from 'react';
import type { Setting } from '../types/setting';
import { FiAlertCircle } from 'react-icons/fi';

interface Props {
  label: string;
  setting: Setting;
  onConfirm: (setting: Setting) => number | null;
}

export function SettingsInput(props: Props): JSX.Element {
  const confirmedByEnter = useRef(false);
  const [error, setError] = useState(false);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      confirmedByEnter.current = true;
      const confirmed = props.onConfirm(props.setting);

      if (confirmed === null) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }

  function handleBlur(): void {
    if (confirmedByEnter.current) {
      confirmedByEnter.current = false;
      return;
    }

    const confirmed = props.onConfirm(props.setting);

    if (confirmed === null) {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <label className="settings-input">
      <span className="settings-input-label">{props.label}</span>
      <input
        className={`settings-input-field ${error ? 'input-error' : ''}`}
        type="number"
        value={props.setting.value}
        min={props.setting.min}
        max={props.setting.max}
        onChange={(e) => {
          props.setting.setValue(e.target.value);
          setError(false);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <div className="settings-input-error-container">
        {error && (
          <span className={`settings-input-error`}>
            <FiAlertCircle />
            <span>
              Entre {props.setting.min} e {props.setting.max}.
            </span>
          </span>
        )}
      </div>
    </label>
  );
}
