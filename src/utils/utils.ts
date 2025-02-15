import { Api } from "../root/Api";

export type NonEmptyArray<T> = [T, ...T[]]

export function formatData(dataAt: string, options: Intl.DateTimeFormatOptions) {
  const date = new Date(dataAt);

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
}

export function getApi () {
  return new Api()
}