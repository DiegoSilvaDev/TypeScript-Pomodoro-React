import { useState, type JSX } from 'react';
import { PomodoroTimer } from './components/pomodoro-timer.tsx';
import './index.css';
import { Settings } from './components/settings.tsx';
import { ToastContainer } from 'react-toastify';

function App(): JSX.Element {
  const [pomodoroTime, setPomodoroTime] = useState(60);
  const [shortRestTime, setShortRestTime] = useState(5);
  const [longRestTime, setLongRestTime] = useState(15);
  const [cycles, setCycles] = useState(4);
  const [working, setWorking] = useState(true);

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
          working={working}
        />

        <PomodoroTimer
          pomodoroTime={pomodoroTime}
          shortRestTime={shortRestTime}
          longRestTime={longRestTime}
          cycles={cycles}
          working={working}
          setWorking={setWorking}
        />
      </div>
    </div>
  );
}

export default App;
