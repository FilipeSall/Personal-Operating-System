import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ReactNode } from 'react';
import {
  MdAir,
  MdClose,
  MdDeviceThermostat,
  MdFilterDrama,
  MdGrain,
  MdOpacity,
  MdShield,
  MdThermostat,
  MdUmbrella,
  MdWarning,
  MdWbCloudy,
  MdWbTwilight,
} from 'react-icons/md';
import type { WeatherRowId } from '../../../types/weather';
import type { WeatherDerived, WeatherState } from '../hooks/useWeather';
import { addTodoModalRecipe } from '../styles/add-todo-modal.styles';
import {
  weatherDetailsHeader,
  weatherDetailsMeta,
  weatherDetailsSubtitle,
  weatherDetailsTable,
  weatherDetailsTableHeadCell,
  weatherDetailsRow,
  weatherDetailsLabelCell,
  weatherDetailsValueCell,
  weatherDetailsRecommendationCell,
  weatherDetailsIcon,
} from './weather-details-modal.styles';

const WEATHER_ICONS: Record<WeatherRowId, ReactNode> = {
  summary: <MdWbCloudy size={18} />,
  temperature: <MdThermostat size={18} />,
  feelsLike: <MdDeviceThermostat size={18} />,
  rainChance: <MdUmbrella size={18} />,
  wind: <MdAir size={18} />,
  humidity: <MdOpacity size={18} />,
  uvIndex: <MdShield size={18} />,
  clouds: <MdFilterDrama size={18} />,
  sunTimes: <MdWbTwilight size={18} />,
  alerts: <MdWarning size={18} />,
  precipitation: <MdGrain size={18} />,
};

type WeatherDetailsModalViewProps = {
  onClose: () => void;
  state: WeatherState;
  derived: WeatherDerived;
};

/**
 * View do modal com os detalhes completos do clima.
 */
export function WeatherDetailsModalView({
  onClose,
  state,
  derived,
}: WeatherDetailsModalViewProps) {
  const modalSlots = addTodoModalRecipe();
  const dateLabel = format(state.selectedDate, "d 'de' MMMM", { locale: ptBR });

  /**
   * Fecha o modal ao clicar fora do conteudo.
   */
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={modalSlots.overlay} onClick={handleOverlayClick}>
      <div className={modalSlots.content}>
        <div className={modalSlots.header}>
          <div className={weatherDetailsHeader}>
            <h3 className={modalSlots.title}>Detalhes do clima</h3>
            <div className={weatherDetailsMeta}>
              <span>{dateLabel}</span>
              <span className={weatherDetailsSubtitle}>{state.locationLabel}</span>
            </div>
          </div>
          <button type="button" className={modalSlots.closeButton} onClick={onClose}>
            <MdClose size={18} />
          </button>
        </div>

        {derived.rows.length === 0 ? (
          <div className={weatherDetailsSubtitle}>Previsao indisponivel para esta data.</div>
        ) : (
          <table className={weatherDetailsTable}>
            <thead>
              <tr>
                <th className={weatherDetailsTableHeadCell}>Dado</th>
                <th className={weatherDetailsTableHeadCell}>Valor</th>
                <th className={weatherDetailsTableHeadCell}>Recomendacao</th>
              </tr>
            </thead>
            <tbody>
              {derived.rows.map((row) => (
                <tr key={row.id} className={weatherDetailsRow}>
                  <td className={weatherDetailsLabelCell}>
                    <span className={weatherDetailsIcon}>{WEATHER_ICONS[row.id]}</span>
                    <span>{row.label}</span>
                  </td>
                  <td className={weatherDetailsValueCell}>{row.value}</td>
                  <td className={weatherDetailsRecommendationCell}>{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
