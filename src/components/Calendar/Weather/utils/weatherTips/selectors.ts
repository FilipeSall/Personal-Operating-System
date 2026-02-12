import type { WeatherTip, WeatherTipKind } from '../../../../../types/weather';
import type { TipPool } from './types';

/**
 * Seleciona dicas de pools ponderados, respeitando prioridades.
 * @param pools Pools de dicas com seus respectivos pesos.
 * @param maxCount Quantidade máxima de dicas selecionadas.
 * @returns Lista final de dicas sem duplicatas semânticas.
 */
export const selectFromWeightedPools = (
  pools: TipPool[],
  maxCount: number
): WeatherTip[] => {
  const selected: WeatherTip[] = [];
  const usedIds = new Set<string>();
  const usedKinds = new Set<WeatherTipKind>();

  // Ordenar pools por peso (maior primeiro)
  const sortedPools = [...pools].sort((a, b) => b.weight - a.weight);

  for (const pool of sortedPools) {
    for (const tip of pool.tips) {
      if (selected.length >= maxCount) {
        return selected;
      }

      // Evitar duplicatas por ID
      if (usedIds.has(tip.id)) {
        continue;
      }

      // Evitar duplicatas semanticas (composite supersede individual metrics)
      if (tip.kind === 'composite') {
        // Composite tips sao sempre adicionados
        selected.push(tip);
        usedIds.add(tip.id);
        usedKinds.add(tip.kind);
      } else if (!usedKinds.has('composite') ||
        !['temperature', 'humidity', 'wind'].includes(tip.kind)) {
        // Adicionar se nao for metrica ja coberta por composite
        selected.push(tip);
        usedIds.add(tip.id);
        usedKinds.add(tip.kind);
      }
    }
  }

  return selected;
};
