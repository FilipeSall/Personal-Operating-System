import { format, fromUnixTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ReactNode } from 'react';
import {
  MdAir,
  MdCheckCircle,
  MdClose,
  MdDeviceThermostat,
  MdFilterDrama,
  MdGrain,
  MdNorthEast,
  MdOpacity,
  MdShield,
  MdSouthWest,
  MdThermostat,
  MdUmbrella,
  MdWarning,
  MdWbCloudy,
  MdWbTwilight,
} from 'react-icons/md';
import { cx } from '../../../../styled-system/css';
import type { WeatherRowId } from '../../../types/weather';
import type { WeatherDerived, WeatherState } from '../hooks/useWeather';
import { addTodoModalRecipe } from '../styles/add-todo-modal.styles';
import {
  weatherDetailsCard,
  weatherDetailsContent,
  weatherDetailsFooter,
  weatherDetailsGrid,
  weatherDetailsIconBox,
  weatherDetailsInfo,
  weatherDetailsLabel,
  weatherDetailsNoData,
  weatherDetailsRecommendation,
  weatherDetailsSecondary,
  weatherDetailsValue,
  weatherDetailsValueComplement,
  gradientBlue,
  gradientCyan,
  gradientGreen,
  gradientGray,
  gradientIndigo,
  gradientOrange,
  gradientPink,
  gradientRed,
  gradientTeal,
  gradientYellow,
  weatherDetailsHeader,
  weatherDetailsMeta,
  weatherDetailsSubtitle,
} from './weather-details-modal.styles';

const WEATHER_ICONS: Record<WeatherRowId, ReactNode> = {
  summary: <MdWbCloudy size={32} />,
  temperature: <MdThermostat size={32} />,
  feelsLike: <MdDeviceThermostat size={32} />,
  rainChance: <MdUmbrella size={32} />,
  wind: <MdAir size={32} />,
  humidity: <MdOpacity size={32} />,
  uvIndex: <MdShield size={32} />,
  clouds: <MdFilterDrama size={32} />,
  sunTimes: <MdWbTwilight size={32} />,
  alerts: <MdWarning size={32} />,
  precipitation: <MdGrain size={32} />,
};

const GRADIENT_MAP: Record<WeatherRowId, string> = {
  summary: gradientBlue,
  temperature: gradientRed,
  feelsLike: gradientOrange,
  rainChance: gradientIndigo,
  wind: gradientTeal,
  humidity: gradientCyan,
  uvIndex: gradientYellow,
  clouds: gradientGray,
  sunTimes: gradientPink,
  alerts: gradientGreen,
  precipitation: gradientBlue,
};

type WeatherDetailsModalViewProps = {
  onClose: () => void;
  state: WeatherState;
  derived: WeatherDerived;
};

/**
 * Renderiza o valor principal da temperatura com min/max como secundário.
 * A tabela de clima já contém "Atual X • Min Y • Max Z", aqui extraímos apenas o atual.
 */
function renderTemperatureValue(temperatureRangeStr: string) {
  // Extrai "Atual 22°C" de "Atual 22°C • Min 20°C • Max 23°C"
  const match = temperatureRangeStr.match(/Atual\s*([\d.]+°C)/);
  const currentTemp = match ? match[1] : temperatureRangeStr;

  // Extrai min e max
  const minMatch = temperatureRangeStr.match(/Min\s*([\d.]+°C)/);
  const maxMatch = temperatureRangeStr.match(/Max\s*([\d.]+°C)/);
  const minMaxStr = minMatch && maxMatch ? `Min ${minMatch[1]} • Max ${maxMatch[1]}` : '';

  return { currentTemp, minMaxStr };
}

/**
 * Renderiza o nascer e pôr do sol com ícones direcionais.
 * O snapshot já contém os unix timestamps.
 */
function renderSunTimes(snapshot: WeatherDerived['snapshot']) {
  if (!snapshot) return null;

  const sunrise = format(fromUnixTime(snapshot.sunrise), 'HH:mm', { locale: ptBR });
  const sunset = format(fromUnixTime(snapshot.sunset), 'HH:mm', { locale: ptBR });

  return { sunrise, sunset };
}

/**
 * Extrai e renderiza valor e unidade/complemento do vento.
 * De "4 km/h • SSW" extrai número, unidade e direção
 */
function renderWindValue(windStr: string) {
  const match = windStr.match(/^([\d.]+)\s*(km\/h)\s*•\s*(.+)$/);
  if (match) {
    return { number: match[1], unit: match[2], direction: match[3] };
  }
  return { number: windStr, unit: '', direction: '' };
}

/**
 * Extrai e renderiza valor e nível do índice UV.
 * De "0.0 (Baixo)" extrai "0.0" e "(Baixo)"
 */
function renderUvValue(uvStr: string) {
  const match = uvStr.match(/^([\d.]+)\s*(.+)$/);
  if (match) {
    return { value: match[1], level: match[2] };
  }
  return { value: uvStr, level: '' };
}

/**
 * Extrai e renderiza precipitação com unidade.
 * De "Chuva 0.3 mm" ou "0 mm" extrai número e unidade
 */
function renderPrecipitationValue(precipStr: string) {
  const match = precipStr.match(/^(?:Chuva\s+|Neve\s+|Chuva .+ Neve .+ )?(\d+(?:\.\d+)?)\s*(mm)$/i);
  if (match) {
    const prefix = precipStr.match(/^(Chuva|Neve|Chuva .+ Neve)\s+/i)?.[1] || '';
    return { prefix, number: match[1], unit: match[2] };
  }
  return { prefix: '', number: precipStr, unit: '' };
}

/**
 * View do modal com os detalhes completos do clima em grid de cards.
 */
export function WeatherDetailsModalView({
  onClose,
  state,
  derived,
}: WeatherDetailsModalViewProps) {
  const modalSlots = addTodoModalRecipe();
  const dateLabel = format(state.selectedDate, "d 'de' MMMM", { locale: ptBR });

  /**
   * Fecha o modal ao clicar fora do conteúdo.
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
          <div className={weatherDetailsNoData}>Previsão indisponível para esta data.</div>
        ) : (
          <div className={weatherDetailsContent}>
            <div className={weatherDetailsGrid}>
              {derived.rows.map((row) => {
                // Tratamento especial para temperatura
                if (row.id === 'temperature') {
                  const { currentTemp, minMaxStr } = renderTemperatureValue(row.value);
                  return (
                    <div key={row.id} className={weatherDetailsCard}>
                      <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                        {WEATHER_ICONS[row.id]}
                      </div>
                      <div className={weatherDetailsInfo}>
                        <h3 className={weatherDetailsLabel}>{row.label}</h3>
                        <p className={weatherDetailsValue}>{currentTemp}</p>
                        {minMaxStr && <p className={weatherDetailsSecondary}>{minMaxStr}</p>}
                      </div>
                      <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                    </div>
                  );
                }

                // Tratamento especial para nascer/pôr do sol
                if (row.id === 'sunTimes') {
                  const sunTimes = renderSunTimes(derived.snapshot);
                  return (
                    <div key={row.id} className={weatherDetailsCard}>
                      <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                        {WEATHER_ICONS[row.id]}
                      </div>
                      <div className={weatherDetailsInfo}>
                        <h3 className={weatherDetailsLabel}>{row.label}</h3>
                        {sunTimes && (
                          <p className={weatherDetailsSecondary}>
                            <MdNorthEast size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                            {sunTimes.sunrise}
                            <span> • </span>
                            <MdSouthWest size={14} style={{ display: 'inline', marginRight: '0.25rem', marginLeft: '0.25rem' }} />
                            {sunTimes.sunset}
                          </p>
                        )}
                      </div>
                      <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                    </div>
                  );
                }

                // Tratamento especial para vento
                if (row.id === 'wind') {
                  const { number, unit, direction } = renderWindValue(row.value);
                  return (
                    <div key={row.id} className={weatherDetailsCard}>
                      <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                        {WEATHER_ICONS[row.id]}
                      </div>
                      <div className={weatherDetailsInfo}>
                        <h3 className={weatherDetailsLabel}>{row.label}</h3>
                        <div className={weatherDetailsValue}>
                          {number}
                          {unit && <span className={weatherDetailsValueComplement}> {unit}</span>}
                          {direction && <span className={weatherDetailsValueComplement}> • {direction}</span>}
                        </div>
                      </div>
                      <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                    </div>
                  );
                }

                // Tratamento especial para índice UV
                if (row.id === 'uvIndex') {
                  const { value, level } = renderUvValue(row.value);
                  return (
                    <div key={row.id} className={weatherDetailsCard}>
                      <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                        {WEATHER_ICONS[row.id]}
                      </div>
                      <div className={weatherDetailsInfo}>
                        <h3 className={weatherDetailsLabel}>{row.label}</h3>
                        <div className={weatherDetailsValue}>
                          {value}
                          {level && <span className={weatherDetailsValueComplement}> {level}</span>}
                        </div>
                      </div>
                      <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                    </div>
                  );
                }

                // Tratamento especial para alertas - usar ícone diferente se sem alertas
                if (row.id === 'alerts') {
                  const hasAlerts = row.value !== 'Sem alertas';
                  const alertIcon = hasAlerts ? WEATHER_ICONS[row.id] : <MdCheckCircle size={32} />;

                  return (
                    <div key={row.id} className={weatherDetailsCard}>
                      <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                        {alertIcon}
                      </div>
                      <div className={weatherDetailsInfo}>
                        <h3 className={weatherDetailsLabel}>{row.label}</h3>
                        <p className={weatherDetailsValue}>{row.value}</p>
                      </div>
                      <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                    </div>
                  );
                }

                // Tratamento especial para precipitação
                if (row.id === 'precipitation') {
                  const { prefix, number, unit } = renderPrecipitationValue(row.value);
                  return (
                    <div key={row.id} className={weatherDetailsCard}>
                      <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                        {WEATHER_ICONS[row.id]}
                      </div>
                      <div className={weatherDetailsInfo}>
                        <h3 className={weatherDetailsLabel}>{row.label}</h3>
                        <div className={weatherDetailsValue}>
                          {prefix && <span>{prefix} </span>}
                          {number}
                          {unit && <span className={weatherDetailsValueComplement}> {unit}</span>}
                        </div>
                      </div>
                      <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                    </div>
                  );
                }

                // Cards padrão
                return (
                  <div key={row.id} className={weatherDetailsCard}>
                    <div className={cx(weatherDetailsIconBox, GRADIENT_MAP[row.id])}>
                      {WEATHER_ICONS[row.id]}
                    </div>
                    <div className={weatherDetailsInfo}>
                      <h3 className={weatherDetailsLabel}>{row.label}</h3>
                      <p className={weatherDetailsValue}>{row.value}</p>
                    </div>
                    <div className={weatherDetailsRecommendation}>{row.recommendation}</div>
                  </div>
                );
              })}
            </div>

            <div className={weatherDetailsFooter}>Dados atualizados agora mesmo.</div>
          </div>
        )}
      </div>
    </div>
  );
}
