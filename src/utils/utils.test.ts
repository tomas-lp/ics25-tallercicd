import { describe, it, expect } from 'vitest';
import { sortAsc, sortDesc, type Tarjeta } from './utils';

describe('Funciones de ordenamiento de tarjetas', () => {
  const tarjetas: Tarjeta[] = [
    { id: 1, numero: 5 },
    { id: 2, numero: 2 },
    { id: 3, numero: 8 },
    { id: 4, numero: 1 },
  ];

  it('ordena ascendentemente por numero', () => {
    const resultado = sortAsc(tarjetas);
    const numerosResultado = resultado.map(t => t.numero);
    
    expect(numerosResultado).toEqual([1, 2, 5, 8]);
  });

  it('ordena descendentemente por numero', () => {
    const resultado = sortDesc(tarjetas);
    const numerosResultado = resultado.map(t => t.numero);
    
    expect(numerosResultado).toEqual([8, 5, 2, 1]);
  });
});
