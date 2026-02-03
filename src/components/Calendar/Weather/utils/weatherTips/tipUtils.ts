import type { WeatherTip, WeatherTipKind } from '../../../../../types/weather';

/**
 * Cria um id de dica consistente.
 */
export const createTip = (
  id: string,
  label: string,
  message: string,
  kind: WeatherTipKind
): WeatherTip => {
  return {
    id,
    label,
    message,
    kind,
  };
};

/**
 * Adiciona uma dica se o tipo ainda nao foi usado.
 */
export const pushUniqueTip = (
  tips: WeatherTip[],
  tip: WeatherTip,
  usedKinds: Set<WeatherTipKind>
): void => {
  if (usedKinds.has(tip.kind)) {
    return;
  }
  tips.push(tip);
  usedKinds.add(tip.kind);
};
