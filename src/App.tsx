import type { JSX } from 'react';
import { PomodoroTimer } from './components/pomodoro-timer.tsx';
import './index.css';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={10}
        shortRestTime={3}
        longRestTime={5}
        cycles={4}
      />
    </div>
  );
}

export default App;
