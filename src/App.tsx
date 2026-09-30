import { useState, type JSX } from 'react';
import { PomodoroTimer } from './components/pomodoro-timer.tsx';
import './index.css';
import { Settings } from './components/settings.tsx';
import { ToastContainer } from 'react-toastify';

function App(): JSX.Element {
  const [pomodoroTime, setPomodoroTime] = useState(10);
  const [shortRestTime, setShortRestTime] = useState(3);
  const [longRestTime, setLongRestTime] = useState(5);
  const [cycles, setCycles] = useState(4);
  return (
    <div className="container">
      <ToastContainer />
      <div className="pomodoro-wrapper">
        <Settings
          pomodoroTime={pomodoroTime}
          setPomodoroTime={setPomodoroTime}
          shortRestTime={shortRestTime}
          setShortRestTime={setShortRestTime}
          longRestTime={longRestTime}
          setLongRestTime={setLongRestTime}
          cycles={cycles}
          setCycles={setCycles}
        />

        <PomodoroTimer
          pomodoroTime={pomodoroTime}
          shortRestTime={shortRestTime}
          longRestTime={longRestTime}
          cycles={cycles}
        />
      </div>
    </div>
  );
}

export default App;
