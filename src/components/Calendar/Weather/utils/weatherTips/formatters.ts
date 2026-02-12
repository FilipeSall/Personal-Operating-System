/**
 * Ajusta mensagens para dias futuros (tom de previsao/preparo).
 * @param message Mensagem base da dica.
 * @returns Mensagem adaptada para referência futura.
 */
export const formatFutureTipMessage = (message: string): string => {
  const sanitized = message.replace(/\bhoje\b/gi, 'nesse dia');
  if (sanitized.startsWith('Previsão') || sanitized.startsWith('Para esse dia')) {
    return sanitized;
  }
  return `Para esse dia, ${sanitized}`;
};
