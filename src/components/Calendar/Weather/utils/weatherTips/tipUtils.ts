import type { WeatherTip, WeatherTipKind } from '../../../../../types/weather';

/**
 * Cria um id de dica consistente.
 * @param id Identificador único da dica.
 * @param label Rótulo exibido no card da dica.
 * @param message Mensagem principal da dica.
 * @param kind Categoria da dica.
 * @returns Estrutura completa de `WeatherTip`.
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
 * @param tips Lista mutável de dicas selecionadas.
 * @param tip Dica candidata.
 * @param usedKinds Conjunto de categorias já usadas.
 * @returns `void`.
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
