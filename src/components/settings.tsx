import { useState, type JSX } from 'react';
import { SettingsInput } from './settings-input';
import { FiSettings, FiX } from 'react-icons/fi';

interface Props {
  pomodoroTime: number;
  setPomodoroTime: (value: number) => void;
  shortRestTime: number;
  setShortRestTime: (value: number) => void;
  longRestTime: number;
  setLongRestTime: (value: number) => void;
  cycles: number;
  setCycles: (value: number) => void;
}

export function Settings(props: Props): JSX.Element {
  const [pomodoroInput, setPomodoroInput] = useState(
    String(props.pomodoroTime)
  );
  const [shortRestInput, setShortRestInput] = useState(
    String(props.shortRestTime)
  );
  const [longRestInput, setLongRestInput] = useState(
    String(props.longRestTime)
  );
  const [cyclesInput, setCyclesInput] = useState(String(props.cycles));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function confirmValue(
    input: string,
    min: number,
    max: number,
    setValue: (value: number) => void
  ): number | null {
    const value = Number(input);

    if (Number.isNaN(value)) {
      return null;
    }

    if (value >= min && value <= max) {
      setValue(value);
      return value;
    }

    return null;
  }
  function confirmInput(
    input: string,
    min: number,
    max: number,
    setValue: (value: number) => void,
    setInput: (value: string) => void,
    currentValue: number
  ): void {
    const confirmed = confirmValue(input, min, max, setValue);

    if (confirmed !== null) {
      setInput(String(confirmed));
    } else {
      setInput(String(currentValue));
    }
  }

  function confirmPomodoroTime(): void {
    confirmInput(
      pomodoroInput,
      1,
      120,
      props.setPomodoroTime,
      setPomodoroInput,
      props.pomodoroTime
    );
  }

  function confirmShortRestTime(): void {
    confirmInput(
      shortRestInput,
      1,
      60,
      props.setShortRestTime,
      setShortRestInput,
      props.shortRestTime
    );
  }

  function confirmLongRestTime(): void {
    confirmInput(
      longRestInput,
      1,
      60,
      props.setLongRestTime,
      setLongRestInput,
      props.longRestTime
    );
  }

  function confirmCycles(): void {
    confirmInput(
      cyclesInput,
      1,
      20,
      props.setCycles,
      setCyclesInput,
      props.cycles
    );
  }

  return (
    <>
      {!isSettingsOpen && (
        <button
          className="settings-open"
          type="button"
          onClick={() => setIsSettingsOpen(true)}
        >
          <FiSettings size={20} />
        </button>
      )}

      {isSettingsOpen && (
        <div className="settings-overlay">
          <section className="settings">
            <button
              className="settings-close"
              type="button"
              onClick={() => setIsSettingsOpen(false)}
            >
              <FiX size={22} />
            </button>
            <h2 className="settings-title">Configurações</h2>
            <div className="settings-fields">
              <SettingsInput
                label="Tempo de trabalho: "
                value={pomodoroInput}
                min={1}
                max={120}
                onChange={(e) => setPomodoroInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmPomodoroTime();
                  }
                }}
                onBlur={confirmPomodoroTime}
              />
              <SettingsInput
                label="Descanso curto: "
                value={shortRestInput}
                min={1}
                max={60}
                onChange={(e) => setShortRestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmShortRestTime();
                  }
                }}
                onBlur={confirmShortRestTime}
              />
              <SettingsInput
                label="Descanso Longo: "
                value={longRestInput}
                min={1}
                max={60}
                onChange={(e) => setLongRestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmLongRestTime();
                  }
                }}
                onBlur={confirmLongRestTime}
              />
              <SettingsInput
                label="Ciclos: "
                value={cyclesInput}
                min={1}
                max={20}
                onChange={(e) => setCyclesInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmCycles();
                  }
                }}
                onBlur={confirmCycles}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
