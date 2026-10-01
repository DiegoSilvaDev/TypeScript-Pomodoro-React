import { type JSX } from 'react';

export interface ToastMessageProps {
  icon: string;
  title: string;
  message: string;
}

export type ToastType =
  | 'toast-pomodoro'
  | 'toast-short-rest'
  | 'toast-long-rest'
  | 'toast-cycles'
  | 'toast-settings';

export function ToastMessage({
  icon,
  title,
  message,
}: ToastMessageProps): JSX.Element {
  return (
    <div className="toast-message">
      <span className="toast-message-icon">{icon}</span>

      <div className="toast-message-content">
        <strong>{title}</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
