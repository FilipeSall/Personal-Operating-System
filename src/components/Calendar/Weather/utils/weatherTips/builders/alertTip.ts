import type { WeatherTip } from '../../../../../../types/weather';
import { createTip } from '../tipUtils';

/**
 * Cria a dica de alertas quando houver avisos oficiais.
 */
export const buildAlertTip = (alerts: string[]): WeatherTip | null => {
  if (alerts.length === 0) {
    return null;
  }

  const preview = alerts[0] ?? 'Alerta meteorologico';
  const trimmedPreview = preview.length > 60 ? `${preview.slice(0, 57)}...` : preview;
  const label = alerts.length > 1 ? 'Alertas' : 'Alerta';

  return createTip(
    'alert',
    label,
    `Tem ${alerts.length} alerta(s) ativo(s). ${trimmedPreview}. Melhor nao brincar com a natureza hoje.`,
    'alert'
  );
};
