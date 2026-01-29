import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { WeatherDetailsModal } from './WeatherDetailsModal';
import { WeatherView } from './WeatherView';

/**
 * Componente container do clima do dia.
 */
export function Weather() {
  const { state, derived, actions } = useWeather();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  /**
   * Abre o modal de detalhes do clima.
   */
  const handleOpenDetails = () => {
    if (!derived.snapshot) {
      return;
    }
    setIsDetailsOpen(true);
  };

  /**
   * Fecha o modal de detalhes do clima.
   */
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <>
      <WeatherView
        state={state}
        derived={derived}
        actions={actions}
        onOpenDetails={handleOpenDetails}
      />
      <WeatherDetailsModal
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        state={state}
        derived={derived}
      />
    </>
  );
}
