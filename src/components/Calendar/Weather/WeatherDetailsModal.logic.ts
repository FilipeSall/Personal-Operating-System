import type { MouseEvent } from 'react';

export type WeatherDetailsModalLogic = {
  handleOverlayClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export type WeatherDetailsModalLogicInput = {
  onClose: () => void;
};

/**
 * Fecha o modal quando o clique ocorre no overlay.
 * @param event Evento de clique do overlay.
 * @param onClose Callback para fechar o modal.
 * @returns `void`.
 */
export const handleWeatherDetailsOverlayClick = (
  event: MouseEvent<HTMLDivElement>,
  onClose: () => void
): void => {
  if (event.target === event.currentTarget) {
    onClose();
  }
};

/**
 * Agrupa as ações de interação do modal de detalhes do clima.
 * @param input Dependências de interação do modal.
 * @param input.onClose Callback para fechar o modal.
 * @returns Objeto com handlers de interação.
 */
export const createWeatherDetailsModalLogic = ({
  onClose,
}: WeatherDetailsModalLogicInput): WeatherDetailsModalLogic => {
  return {
    handleOverlayClick: (event) => handleWeatherDetailsOverlayClick(event, onClose),
  };
};
