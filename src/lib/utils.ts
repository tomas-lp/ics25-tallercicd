import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Tarjeta {
  id: number;
  numero: number;
}

export function sortAsc(cardsArray: Tarjeta[]) {
  return [...cardsArray].sort((a, b) => a.numero - b.numero);
}

export function sortDesc(cardsArray: Tarjeta[]) {
  return [...cardsArray].sort((a, b) => b.numero - a.numero);
}
