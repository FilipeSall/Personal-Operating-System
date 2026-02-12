import { hashText } from './text';

/**
 * Monta uma seed usando a data e a descricao do clima.
 * @param selectedDate Data selecionada no calendário.
 * @param description Descrição textual do clima.
 * @returns Seed numérica determinística.
 */
export const buildTipSeed = (selectedDate: Date, description: string): number => {
  const dateSeed =
    selectedDate.getFullYear() * 10000 +
    (selectedDate.getMonth() + 1) * 100 +
    selectedDate.getDate();
  return dateSeed + hashText(description);
};
