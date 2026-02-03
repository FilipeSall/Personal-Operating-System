import { create } from 'zustand';

export type WeatherUiState = {
  isDetailsOpen: boolean;
};

export type WeatherUiActions = {
  openDetails: () => void;
  closeDetails: () => void;
};

export type WeatherUiStore = WeatherUiState & WeatherUiActions;

/**
 * Store de UI para controlar o modal de detalhes do clima.
 */
export const useWeatherUiStore = create<WeatherUiStore>((set) => ({
  isDetailsOpen: false,

  /**
   * Abre o modal de detalhes do clima.
   */
  openDetails: () => set({ isDetailsOpen: true }),

  /**
   * Fecha o modal de detalhes do clima.
   */
  closeDetails: () => set({ isDetailsOpen: false }),
}));
