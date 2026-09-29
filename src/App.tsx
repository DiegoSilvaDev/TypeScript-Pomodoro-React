import type { JSX } from 'react';
import { PomodoroTimer } from './components/pomodoro-timer.tsx';

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer defaultPomodoroTime={1500} />
    </div>
  );
}

export default App;
