export class MMKV {
  constructor(configuration?: any);
  set(key: string, value: string | number | boolean | ArrayBuffer): void;
  getString(key: string): string | undefined;
  getNumber(key: string): number | undefined;
  getBoolean(key: string): boolean | undefined;
  contains(key: string): boolean;
  delete(key: string): void;
  clearAll(): void;
  getAllKeys(): string[];
  addOnValueChangedListener(listener: (key: string) => void): { remove(): void };
}
