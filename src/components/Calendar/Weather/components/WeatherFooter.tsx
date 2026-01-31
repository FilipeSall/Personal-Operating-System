import { MdArrowForward, MdRefresh } from 'react-icons/md';
import type { WeatherActions, WeatherDerived, WeatherState } from '../../hooks/useWeather';
import {
  weatherFooter,
  weatherRefreshGroup,
  weatherRefreshButton,
  weatherUpdatedLabel,
  weatherDetailsButton,
} from '../styles/WeatherFooter.styles';

type WeatherFooterProps = {
  actions: WeatherActions;
  derived: WeatherDerived;
  state: WeatherState;
  onOpenDetails: () => void;
  updatedAtLabel: string | null;
};

/**
 * Rodapé com ações de atualização e acesso aos detalhes do clima.
 */
export function WeatherFooter({
  actions,
  derived,
  state,
  onOpenDetails,
  updatedAtLabel,
}: WeatherFooterProps) {
  return (
    <div className={weatherFooter}>
      <div className={weatherRefreshGroup}>
        <button
          type="button"
          className={weatherRefreshButton}
          onClick={actions.refreshWeather}
          disabled={state.isLoading}
          title="Atualizar"
        >
          <MdRefresh size={20} />
        </button>
        {updatedAtLabel && (
          <span className={weatherUpdatedLabel}>Atualizado as {updatedAtLabel}</span>
        )}
      </div>
      <button
        type="button"
        className={weatherDetailsButton}
        disabled={!derived.snapshot}
        onClick={onOpenDetails}
      >
        <span>Ver detalhes</span>
        <MdArrowForward size={16} />
      </button>
    </div>
  );
}
