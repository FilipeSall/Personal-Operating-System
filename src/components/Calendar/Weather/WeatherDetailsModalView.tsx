import { MdClose } from 'react-icons/md';
import type { WeatherDerived, WeatherState } from '../hooks/useWeather';
import { weatherDetailsModalRecipe } from '../styles/add-todo-modal.styles';
import {
  weatherDetailsContent,
  weatherDetailsFooter,
  weatherDetailsGrid,
  weatherDetailsNoData,
  weatherDetailsHeader,
  weatherDetailsMeta,
  weatherDetailsSubtitle,
} from './CSS/weather-details-modal.styles';
import { createWeatherDetailsModalLogic } from './WeatherDetailsModal.logic';
import { WeatherDetailsModalCard } from './components/WeatherDetailsModalCard';
import { buildWeatherDetailsModalViewModel } from './services/weatherDetailsModalService';

type WeatherDetailsModalViewProps = {
  onClose: () => void;
  state: WeatherState;
  derived: WeatherDerived;
};

/**
 * View do modal com os detalhes completos do clima em grid de cards.
 */
export function WeatherDetailsModalView({
  onClose,
  state,
  derived,
}: WeatherDetailsModalViewProps) {
  const modalSlots = weatherDetailsModalRecipe();
  const { handleOverlayClick } = createWeatherDetailsModalLogic({ onClose });
  const viewModel = buildWeatherDetailsModalViewModel({ state, derived });

  return (
    <div className={modalSlots.overlay} onClick={handleOverlayClick}>
      <div className={modalSlots.content}>
        <div className={modalSlots.header}>
          <div className={weatherDetailsHeader}>
            <h3 className={modalSlots.title}>Detalhes do clima</h3>
            <div className={weatherDetailsMeta}>
              <span>{viewModel.dateLabel}</span>
              <span className={weatherDetailsSubtitle}>{viewModel.locationLabel}</span>
            </div>
          </div>
          <button type="button" className={modalSlots.closeButton} onClick={onClose}>
            <MdClose size={18} />
          </button>
        </div>

        {!viewModel.hasData ? (
          <div className={weatherDetailsNoData}>Previsão indisponível para esta data.</div>
        ) : (
          <div className={weatherDetailsContent}>
            <div className={weatherDetailsGrid}>
              {viewModel.cards.map((card) => (
                <WeatherDetailsModalCard key={card.id} card={card} />
              ))}
            </div>

            <div className={weatherDetailsFooter}>Dados atualizados agora mesmo.</div>
          </div>
        )}
      </div>
    </div>
  );
}
