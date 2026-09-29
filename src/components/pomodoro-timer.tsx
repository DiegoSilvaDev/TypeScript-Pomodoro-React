import { useEffect, useState, type JSX } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  PomodoroTime: number;
  ShortRestTime: number;
  LongRestTime: number;
  Cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.PomodoroTime);
  const [timeCounting, setTimeCouting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = () => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.PomodoroTime);
  };
  const configureRest = (Long: boolean) => {
    setTimeCouting(true);
    setWorking(false);
    setResting(true);

    if (Long) {
      setMainTime(props.LongRestTime);
    } else {
      setMainTime(props.ShortRestTime);
    }
  };

  return (
    <div className="pomodoro">
      <h2>You are: Working</h2>
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
        <p>Testando: asdjiadijoadjasio adoasjokpdaokpjdao</p>
        <p>Testando: asdjiadijoadjasio adoasjokpdaokpjdao</p>
        <p>Testando: asdjiadijoadjasio adoasjokpdaokpjdao</p>
        <p>Testando: asdjiadijoadjasio adoasjokpdaokpjdao</p>
        <p>Testando: asdjiadijoadjasio adoasjokpdaokpjdao</p>
      </div>
    </div>
  );
}
