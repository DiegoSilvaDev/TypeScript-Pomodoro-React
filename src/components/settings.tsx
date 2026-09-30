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
  | 'toast-pomodoro'
  | 'toast-short-rest'
  | 'toast-long-rest'
  | 'toast-cycles'
  | 'toast-settings';

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
    max: number
  ): number | null {
    const value = Number(input);

    if (Number.isNaN(value)) {
      return null;
    }

    if (value >= min && value <= max) {
      return value;
    }

    return null;
  }
  function confirmInput(
    input: string,
    min: number,
    max: number,
    setInput: (value: string) => void,
    currentValue: number
  ): number | null {
    const confirmed = confirmValue(input, min, max);

    if (confirmed !== null) {
      setInput(String(confirmed));
      return confirmed;
    }

    setInput(String(currentValue));
    return null;
  }

  function applySettings(): void {
    const pomodoro = confirmPomodoroTime();
    const shortRest = confirmShortRestTime();
    const longRest = confirmLongRestTime();
    const cycles = confirmCycles();

    if (
      pomodoro === null ||
      shortRest === null ||
      longRest === null ||
      cycles === null
    ) {
      return;
    }

    const changes: string[] = [];

    if (pomodoro !== props.pomodoroTime) {
      changes.push('Pomodoro');
    }
    if (shortRest !== props.shortRestTime) {
      changes.push(`Descanso curto`);
    }
    if (longRest !== props.longRestTime) {
      changes.push(`Descanso longo`);
    }
    if (cycles !== props.cycles) {
      changes.push(`Ciclos`);
    }

    if (changes.length === 0) {
      setIsSettingsOpen(false);
      return;
    }

    if (pomodoro !== props.pomodoroTime) {
      props.setPomodoroTime(pomodoro);

      if (changes.length === 1) {
        showUpdateToast(
          '🍅',
          'Pomodoro atualizado',
          `Seu tempo de trabalho agora é ${pomodoro} minutos`,
          'toast-pomodoro'
        );
      }
    }

    if (shortRest !== props.shortRestTime) {
      props.setShortRestTime(shortRest);

      if (changes.length === 1) {
        showUpdateToast(
          '☕',
          'Descanso curto atualizado',
          `Seu descanso agora é ${shortRest} minutos`,
          'toast-short-rest'
        );
      }
    }

    if (longRest !== props.longRestTime) {
      props.setLongRestTime(longRest);
      if (changes.length === 1) {
        showUpdateToast(
          '🌙',
          'Descanso longo atualizado',
          `Seu descanso agora é ${longRest} minutos`,
          'toast-long-rest'
        );
      }
    }

    if (cycles !== props.cycles) {
      props.setCycles(cycles);

      if (changes.length === 1) {
        showUpdateToast(
          '🔄',
          'Ciclos atualizados',
          `Você configurou ${cycles} ciclos`,
          'toast-cycles'
        );
      }
    }

    if (changes.length > 1) {
      const message =
        changes.length <= 2
          ? `${changes.join(' e ')} alterados.`
          : `${changes.length} configurações foram alteradas`;

      showUpdateToast(
        '⚙️',
        'Configurações atualizadas',
        message,
        'toast-settings'
      );
    }

    setIsSettingsOpen(false);
  }

  function confirmPomodoroTime(): number | null {
    return confirmInput(
      pomodoroInput,
      1,
      120,
      setPomodoroInput,
      props.pomodoroTime
    );
  }

  function confirmShortRestTime(): number | null {
    return confirmInput(
      shortRestInput,
      1,
      60,
      setShortRestInput,
      props.shortRestTime
    );
  }

  function confirmLongRestTime(): number | null {
    return confirmInput(
      longRestInput,
      1,
      60,
      setLongRestInput,
      props.longRestTime
    );
  }

  function confirmCycles(): number | null {
    return confirmInput(cyclesInput, 1, 20, setCyclesInput, props.cycles);
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
                label="Descanso longo: "
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
            <button
              className="settings-apply"
              type="button"
              onClick={applySettings}
            >
              Aplicar alterações
            </button>
          </section>
        </div>
      )}
    </>
  );
}
