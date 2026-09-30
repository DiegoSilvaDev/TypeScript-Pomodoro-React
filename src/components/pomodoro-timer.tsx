import { useEffect, useState, useCallback, type JSX } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import Sound from '../sounds/audio.mp3';
import { secondsToTime } from '../utils/seconds-to-time';

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
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime * 60);
  const [timeCounting, setTimeCouting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const configureWork = useCallback(() => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime * 60);
    playAudioForDuration(5800);
  }, [props.pomodoroTime]);

  const configureRest = useCallback(
    (Long: boolean) => {
      setTimeCouting(true);
      setWorking(false);
      setResting(true);

      if (Long) {
        setMainTime(props.longRestTime * 60);
      } else {
        setMainTime(props.shortRestTime * 60);
      }

      playAudioForDuration(5800);
    },
    [props.longRestTime, props.shortRestTime]
  );
  // Efeito restrio somente à manipulação do DOM
  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  // Lógica de contagem e transição de ciclos centralizada no intervalo
  useInterval(
    () => {
      // Se o tempo ainda for maior que zero, apenas subtrai 1
      if (mainTime > 0) {
        setMainTime(mainTime - 1);
        if (working) setFullWorkingTime(fullWorkingTime + 1);
        return;
      }
      // Quando o relogio chega a 0, trata-se a transição diretamente aqui:
      if (working && cyclesQtdManager.length > 0) {
        configureRest(false);
        setCyclesQtdManager((prev) => prev.slice(0, -1));
        setNumberOfPomodoros((prev) => prev + 1);
      } else if (working && cyclesQtdManager.length <= 0) {
        configureRest(true);
        setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
        setCompletedCycles((prev) => prev + 1);
        setNumberOfPomodoros((prev) => prev + 1);
      } else if (resting) {
        configureWork();
      }
    },
    timeCounting ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'Working' : 'Resting'}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCouting(!timeCounting)}
        ></Button>
      </div>
      <div className="details">
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
