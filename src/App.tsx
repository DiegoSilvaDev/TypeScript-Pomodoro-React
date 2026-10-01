import { useState, useEffect, type JSX } from 'react';
import { getLocalStorage, setLocalStorage } from './utils/local-storage.ts';
import { PomodoroTimer } from './components/pomodoro-timer.tsx';
import './index.css';
import { Settings } from './components/settings.tsx';
import { ToastContainer } from 'react-toastify';

function App(): JSX.Element {
  const [pomodoroTime, setPomodoroTime] = useState(() =>
    getLocalStorage('pomodoroTime', 60)
  );
  const [shortRestTime, setShortRestTime] = useState(() =>
    getLocalStorage('shortRestTime', 5)
  );
  const [longRestTime, setLongRestTime] = useState(() =>
    getLocalStorage('longRestTime', 16)
  );
  const [cycles, setCycles] = useState(() => getLocalStorage('cycles', 4));

  const [working, setWorking] = useState(true);

  const [fullWorkingTime, setFullWorkingTime] = useState(() =>
    getLocalStorage('fullWorkingTime', 0)
  );

  const [numberOfPomodoros, setNumberOfPomodoros] = useState(() =>
    getLocalStorage('numberOfPomodoros', 0)
  );

  const [completedCycles, setCompletedCycles] = useState(() =>
    getLocalStorage('completedCycles', 0)
  );

  useEffect(() => {
    setLocalStorage('pomodoroTime', pomodoroTime);
    setLocalStorage('shortRestTime', shortRestTime);
    setLocalStorage('longRestTime', longRestTime);
    setLocalStorage('cycles', cycles);
    setLocalStorage('fullWorkingTime', fullWorkingTime);
    setLocalStorage('numberOfPomodoros', numberOfPomodoros);
    setLocalStorage('completedCycles', completedCycles);
  }, [
    pomodoroTime,
    shortRestTime,
    longRestTime,
    cycles,
    fullWorkingTime,
    numberOfPomodoros,
    completedCycles,
  ]);

  function resetStatistics(): void {
    setFullWorkingTime(0);
    setCompletedCycles(0);
    setNumberOfPomodoros(0);
  }

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
          fullWorkingTime={fullWorkingTime}
          setFullWorkingTime={setFullWorkingTime}
          numberOfPomodoros={numberOfPomodoros}
          setNumberOfPomodoros={setNumberOfPomodoros}
          completedCycles={completedCycles}
          setCompletedCycles={setCompletedCycles}
          resetStatistics={resetStatistics}
        />
      </div>
    </div>
  );
}

export default App;
