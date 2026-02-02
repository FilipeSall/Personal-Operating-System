import { hashText } from './text';

/**
 * Monta uma seed usando a data e a descricao do clima.
 */
export const buildTipSeed = (selectedDate: Date, description: string): number => {
  const dateSeed =
    selectedDate.getFullYear() * 10000 +
    (selectedDate.getMonth() + 1) * 100 +
    selectedDate.getDate();
  return dateSeed + hashText(description);
};
