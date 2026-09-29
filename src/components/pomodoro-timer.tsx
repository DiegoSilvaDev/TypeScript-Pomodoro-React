import { useState, type JSX } from 'react';
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

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: Working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="teste" onClick={() => console.log('teste')}></Button>
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
