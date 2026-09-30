import { useRef, useState, type JSX } from 'react';
import { SettingsInput } from './settings-input';
import { FiSettings, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

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

interface ToastMessageProps {
  icon: string;
  title: string;
  message: string;
}

type ToastType =
  'toast-pomodoro' | 'toast-short-rest' | 'toast-long-rest' | 'toast-cycles';

function ToastMessage({
  icon,
  title,
  message,
}: ToastMessageProps): JSX.Element {
  return (
    <div className="toast-message">
      <span className="toast-message-icon">{icon}</span>

      <div className="toast-message-content">
        <strong>{title}</strong>
        <span>{message}</span>
      </div>
    </div>
  );
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
  const confirmedByEnter = useRef(false);

  function showUpdateToast(
    icon: string,
    title: string,
    message: string,
    type: ToastType
  ): void {
    toast.success(
      <ToastMessage icon={icon} title={title} message={message} />,
      {
        className: `settings-toast ${type}`,
        icon: false,
      }
    );
  }

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
  ): number | null {
    const confirmed = confirmValue(input, min, max, setValue);

    if (confirmed !== null) {
      setInput(String(confirmed));

      if (confirmed !== currentValue) {
        return confirmed;
      }
      return null;
    }

    setInput(String(currentValue));
    return null;
  }

  function confirmPomodoroTime(): void {
    const confirmed = confirmInput(
      pomodoroInput,
      1,
      120,
      props.setPomodoroTime,
      setPomodoroInput,
      props.pomodoroTime
    );

    if (confirmed !== null) {
      showUpdateToast(
        '🍅',
        'Pomodoro atualizado',
        `Seu tempo de trabalho agora é ${confirmed} minutos`,
        'toast-pomodoro'
      );
    }
  }

  function confirmShortRestTime(): void {
    const confirmed = confirmInput(
      shortRestInput,
      1,
      60,
      props.setShortRestTime,
      setShortRestInput,
      props.shortRestTime
    );

    if (confirmed !== null) {
      showUpdateToast(
        '☕',
        'Descanso curto atualizado',
        `Seu descanso agora é ${confirmed} minutos`,
        'toast-short-rest'
      );
    }
  }

  function confirmLongRestTime(): void {
    const confirmed = confirmInput(
      longRestInput,
      1,
      60,
      props.setLongRestTime,
      setLongRestInput,
      props.longRestTime
    );

    if (confirmed !== null) {
      showUpdateToast(
        '🌙',
        'Descanso longo atualizado',
        `Seu descanso agora é ${confirmed} minutos`,
        'toast-long-rest'
      );
    }
  }

  function confirmCycles(): void {
    const confirmed = confirmInput(
      cyclesInput,
      1,
      20,
      props.setCycles,
      setCyclesInput,
      props.cycles
    );

    if (confirmed !== null) {
      showUpdateToast(
        '🔄',
        'Ciclos atualizados',
        `Você configurou ${confirmed} ciclos`,
        'toast-cycles'
      );
    }
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
                    confirmedByEnter.current = true;
                    confirmPomodoroTime();
                  }
                }}
                onBlur={() => {
                  if (confirmedByEnter.current) {
                    confirmedByEnter.current = false;
                    return;
                  }

                  confirmPomodoroTime();
                }}
              />
              <SettingsInput
                label="Descanso curto: "
                value={shortRestInput}
                min={1}
                max={60}
                onChange={(e) => setShortRestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmedByEnter.current = true;
                    confirmShortRestTime();
                  }
                }}
                onBlur={() => {
                  if (confirmedByEnter.current) {
                    confirmedByEnter.current = false;
                    return;
                  }

                  confirmShortRestTime();
                }}
              />
              <SettingsInput
                label="Descanso Longo: "
                value={longRestInput}
                min={1}
                max={60}
                onChange={(e) => setLongRestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmedByEnter.current = true;
                    confirmLongRestTime();
                  }
                }}
                onBlur={() => {
                  if (confirmedByEnter.current) {
                    confirmedByEnter.current = false;
                    return;
                  }
                  confirmLongRestTime();
                }}
              />
              <SettingsInput
                label="Ciclos: "
                value={cyclesInput}
                min={1}
                max={20}
                onChange={(e) => setCyclesInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmedByEnter.current = true;
                    confirmCycles();
                  }
                }}
                onBlur={() => {
                  if (confirmedByEnter.current) {
                    confirmedByEnter.current = false;
                    return;
                  }

                  confirmCycles();
                }}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
