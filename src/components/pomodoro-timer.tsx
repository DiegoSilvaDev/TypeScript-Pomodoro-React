import {
  useLayoutEffect,
  useState,
  useCallback,
  type JSX,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { Statistics } from './statistics';
import { showBrowserNotification } from '../utils/show-browser-notification';
import { requestNotificationPermission } from '../utils/request-permission';
import Sound from '../sounds/audio.mp3';

const audio = new Audio(Sound);

let audioTimeout: number | undefined;

const playAudioForDuration = (durationInMs: number) => {
  if (audioTimeout) clearTimeout(audioTimeout);

  audio.pause();
  audio.currentTime = 0;

  audio.play().catch(() => {});

  audioTimeout = window.setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, durationInMs);
};

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  working: boolean;
  setWorking: (value: boolean) => void;
  fullWorkingTime: number;
  setFullWorkingTime: Dispatch<SetStateAction<number>>;
  numberOfPomodoros: number;
  setNumberOfPomodoros: Dispatch<SetStateAction<number>>;
  completedCycles: number;
  setCompletedCycles: Dispatch<SetStateAction<number>>;
  resetStatistics: () => void;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const {
    pomodoroTime,
    shortRestTime,
    longRestTime,
    cycles,
    working,
    setWorking,
    fullWorkingTime,
    setFullWorkingTime,
    numberOfPomodoros,
    setNumberOfPomodoros,
    completedCycles,
    setCompletedCycles,
    resetStatistics,
  } = props;

  const [mainTime, setMainTime] = useState(pomodoroTime * 60);
  const [timeCounting, setTimeCouting] = useState(false);
  const [resting, setResting] = useState(false);
  const [started, setStarted] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(cycles - 1).fill(true)
  );

  const displayedTime = !started ? pomodoroTime * 60 : mainTime;

  const configureWork = useCallback(() => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime * 60);
    playAudioForDuration(5800);
  }, [pomodoroTime, setWorking]);

  const configureRest = useCallback(
    (Long: boolean) => {
      setTimeCouting(true);
      setWorking(false);
      setResting(true);

      if (Long) {
        setMainTime(longRestTime * 60);
      } else {
        setMainTime(shortRestTime * 60);
      }

      playAudioForDuration(5800);
    },
    [longRestTime, shortRestTime, setWorking]
  );
  // Efeito restrio somente à manipulação do DOM
  useLayoutEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  // Lógica de contagem e transição de ciclos centralizada no intervalo
  useInterval(
    () => {
      // Se o tempo ainda for maior que zero, apenas subtrai 1
      if (mainTime > 0) {
        setMainTime((prev) => prev - 1);
        if (working) setFullWorkingTime((prev) => prev + 1);
        return;
      }
      // Quando o relogio chega a 0, trata-se a transição diretamente aqui:
      if (working && cyclesQtdManager.length > 0) {
        showBrowserNotification(
          'Pomodoro concluído',
          'Está na hora de fazer um pequeno descanso!'
        );
        configureRest(false);
        setCyclesQtdManager((prev) => prev.slice(0, -1));
        setNumberOfPomodoros((prev) => prev + 1);
      } else if (working && cyclesQtdManager.length <= 0) {
        showBrowserNotification(
          'Ciclo concluído',
          'Está na hora de fazer um descanso longo!'
        );
        configureRest(true);
        setCyclesQtdManager(new Array(cycles - 1).fill(true));
        setCompletedCycles((prev) => prev + 1);
        setNumberOfPomodoros((prev) => prev + 1);
      } else if (resting) {
        showBrowserNotification(
          'Descanso Concluído',
          'Hora de voltar ao trabalho!'
        );
        configureWork();
      }
    },
    timeCounting ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'Working' : 'Resting'}</h2>
      <Timer mainTime={displayedTime} />
      <div className="controls">
        {!started ? (
          <Button
            text="Start"
            onClick={() => {
              requestNotificationPermission();
              setStarted(true);
              configureWork();
            }}
          />
        ) : (
          <>
            <Button text="Work" onClick={() => configureWork()}></Button>
            <Button text="Rest" onClick={() => configureRest(false)}></Button>
            <Button
              className="timer-control"
              text={timeCounting ? 'Pause' : 'Play'}
              onClick={() => setTimeCouting(!timeCounting)}
            ></Button>
          </>
        )}
      </div>
      <Statistics
        fullWorkingTime={fullWorkingTime}
        completedCycles={completedCycles}
        numberOfPomodoros={numberOfPomodoros}
        resetStatistics={resetStatistics}
      />
    </div>
  );
}
