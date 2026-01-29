import { createPortal } from 'react-dom';
import type { WeatherDerived, WeatherState } from '../hooks/useWeather';
import { WeatherDetailsModalView } from './WeatherDetailsModalView';

type WeatherDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  state: WeatherState;
  derived: WeatherDerived;
};

/**
 * Container do modal de detalhes do clima.
 */
export function WeatherDetailsModal({
  isOpen,
  onClose,
  state,
  derived,
}: WeatherDetailsModalProps) {
  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const modal = (
    <WeatherDetailsModalView onClose={onClose} state={state} derived={derived} />
  );

  return createPortal(modal, document.body);
}
