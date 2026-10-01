import type { JSX } from 'react';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';

interface Props {
  fullWorkingTime: number;
  completedCycles: number;
  numberOfPomodoros: number;
  resetStatistics: () => void;
}

export function Statistics(props: Props): JSX.Element {
  function handleResetStatistics(): void {
    const confirmed = window.confirm(
      'Tem certeza que deseja resetar as estatísticas?'
    );

    if (!confirmed) return;

    props.resetStatistics();
  }

  return (
    <div className="statistics">
      <h3>Estatísticas</h3>

      <div className="statistics-data">
        <div className="statistics-item">
          <span className="statistics-label">Tempo trabalhado</span>
          <span className="statistics-value">
            {secondsToTime(props.fullWorkingTime)}
          </span>
        </div>

        <div className="statistics-item">
          <span className="statistics-label">Ciclos</span>
          <span className="statistics-value">{props.completedCycles}</span>
        </div>

        <div className="statistics-item">
          <span className="statistics-label">Pomodoros</span>
          <span className="statistics-value">{props.numberOfPomodoros}</span>
        </div>
      </div>
      <Button
        className="statistics-reset"
        text="Resetar estatísticas"
        onClick={handleResetStatistics}
      />
    </div>
  );
}
