import { useState, type JSX } from 'react';
import { SettingsInput } from './settings-input';
import { FiSettings, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ToastMessage, type ToastType } from './toast-message';
import { confirmInput } from '../utils/confirm-input';
import type { Setting } from '../types/setting';
import { Button } from './button';

interface Props {
  pomodoroTime: number;
  setPomodoroTime: (value: number) => void;
  shortRestTime: number;
  setShortRestTime: (value: number) => void;
  longRestTime: number;
  setLongRestTime: (value: number) => void;
  cycles: number;
  setCycles: (value: number) => void;
  working: boolean;
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

  const pomodoroSetting: Setting = {
    value: pomodoroInput,
    min: 1,
    max: 120,
    setValue: setPomodoroInput,
  };

  const shortRestSetting: Setting = {
    value: shortRestInput,
    min: 1,
    max: 60,
    setValue: setShortRestInput,
  };

  const longRestSetting: Setting = {
    value: longRestInput,
    min: 1,
    max: 60,
    setValue: setLongRestInput,
  };

  const cyclesSetting: Setting = {
    value: cyclesInput,
    min: 1,
    max: 20,
    setValue: setCyclesInput,
  };

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

  function confirmSettings(setting: Setting): number | null {
    return confirmInput(
      setting.value,
      setting.min,
      setting.max,
      setting.setValue
    );
  }

  function resetSettingsInput(): void {
    setPomodoroInput(String(props.pomodoroTime));
    setShortRestInput(String(props.shortRestTime));
    setLongRestInput(String(props.longRestTime));
    setCyclesInput(String(props.cycles));
  }

  function applySettings(): void {
    const pomodoro = confirmSettings(pomodoroSetting);
    const shortRest = confirmSettings(shortRestSetting);
    const longRest = confirmSettings(longRestSetting);
    const cycles = confirmSettings(cyclesSetting);

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
              onClick={() => {
                resetSettingsInput();
                setIsSettingsOpen(false);
              }}
            >
              <FiX size={22} />
            </button>
            <h2 className="settings-title">Configurações</h2>
            <div className="settings-fields">
              <SettingsInput
                label="Tempo de trabalho: "
                setting={pomodoroSetting}
                onConfirm={confirmSettings}
              />
              <SettingsInput
                label="Descanso curto: "
                setting={shortRestSetting}
                onConfirm={confirmSettings}
              />
              <SettingsInput
                label="Descanso longo: "
                setting={longRestSetting}
                onConfirm={confirmSettings}
              />
              <SettingsInput
                label="Ciclos: "
                setting={cyclesSetting}
                onConfirm={confirmSettings}
              />
            </div>
            <Button
              className={`settings-apply ${
                props.working
                  ? 'settings-apply-working'
                  : 'settings-apply-resting'
              }`}
              text="Aplicar alterações"
              onClick={applySettings}
            ></Button>
          </section>
        </div>
      )}
    </>
  );
}
