import type { WeatherTip } from '../../../../../types/weather';

/**
 * Normaliza texto para comparacoes simples.
 * @param value Texto bruto.
 * @returns Texto normalizado sem diacríticos e em minúsculas.
 */
export const normalizeText = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
};

/**
 * Capitaliza a primeira letra de um texto.
 * @param value Texto de entrada.
 * @returns Texto com primeira letra em maiúsculo.
 */
export const capitalizeText = (value: string): string => {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Gera um hash simples para textos.
 * @param value Texto de entrada.
 * @returns Hash numérico absoluto.
 */
export const hashText = (value: string): number => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

/**
 * Cria um gerador pseudo-aleatorio com seed.
 * @param seed Seed numérica para o gerador.
 * @returns Função geradora de números pseudo-aleatórios entre 0 e 1.
 */
export const createSeededRandom = (seed: number): (() => number) => {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Embaralha as dicas usando uma seed deterministica.
 * @param tips Lista de dicas.
 * @param seed Seed usada no embaralhamento.
 * @returns Nova lista embaralhada de forma determinística.
 */
export const shuffleTips = (tips: WeatherTip[], seed: number): WeatherTip[] => {
  const random = createSeededRandom(seed);
  const output = [...tips];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
};
