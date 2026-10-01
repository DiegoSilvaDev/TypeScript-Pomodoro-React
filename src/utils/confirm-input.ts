import { confirmValue } from './confirm-value';

export function confirmInput(
  input: string,
  min: number,
  max: number,
  setInput: (value: string) => void
): number | null {
  const confirmed = confirmValue(input, min, max);

  if (confirmed !== null) {
    setInput(String(confirmed));
    return confirmed;
  }

  return null;
}
