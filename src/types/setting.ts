export interface Setting {
  value: string;
  min: number;
  max: number;
  setValue: (value: string) => void;
}
