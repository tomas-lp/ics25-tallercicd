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