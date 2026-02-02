/**
 * Ajusta mensagens para dias futuros (tom de previsao/preparo).
 */
export const formatFutureTipMessage = (message: string): string => {
  const sanitized = message.replace(/\bhoje\b/gi, 'nesse dia');
  if (sanitized.startsWith('Previsão') || sanitized.startsWith('Para esse dia')) {
    return sanitized;
  }
  return `Para esse dia, ${sanitized}`;
};
