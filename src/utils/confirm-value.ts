export function confirmValue(
  input: string,
  min: number,
  max: number
): number | null {
  const value = Number(input);

  if (Number.isNaN(value)) {
    return null;
  }

  if (value >= min && value <= max) {
    return value;
  }

  return null;
}
