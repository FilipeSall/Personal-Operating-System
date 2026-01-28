import { format, fromUnixTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { WeatherRow, WeatherSnapshot } from '../../../types/weather';

/**
 * Normaliza texto para comparacoes simples.
 */
const normalizeText = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
};

/**
 * Capitaliza a primeira letra de um texto.
 */
const capitalizeText = (value: string): string => {
  if (!value) {
    return 'Sem descricao';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Formata uma temperatura em graus Celsius.
 */
const formatTemperatureValue = (value: number): string => {
  return `${Math.round(value)}°C`;
};

/**
 * Formata o intervalo de temperatura (atual, minima e maxima).
 */
const formatTemperatureRange = (temperature: WeatherSnapshot['temperature']): string => {
  return `Atual ${formatTemperatureValue(temperature.current)} • Min ${formatTemperatureValue(temperature.min)} • Max ${formatTemperatureValue(temperature.max)}`;
};

/**
 * Converte a direcao do vento em pontos cardeais.
 */
const getWindDirectionLabel = (degrees: number): string => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(degrees / 22.5) % directions.length;
  return directions[index];
};

/**
 * Formata o vento em km/h com direcao.
 */
const formatWind = (speed: number, degrees: number): string => {
  const speedKmh = Math.round(speed * 3.6);
  return `${speedKmh} km/h • ${getWindDirectionLabel(degrees)}`;
};

/**
 * Formata um horario a partir de unix time.
 */
const formatTime = (unixTime: number): string => {
  return format(fromUnixTime(unixTime), 'HH:mm', { locale: ptBR });
};

/**
 * Formata nascer e por do sol em uma unica string.
 */
const formatSunTimes = (sunrise: number, sunset: number): string => {
  return `${formatTime(sunrise)} / ${formatTime(sunset)}`;
};

/**
 * Formata a chance de chuva em porcentagem.
 */
const formatRainChance = (pop: number): string => {
  return `${Math.round(pop * 100)}%`;
};

/**
 * Classifica o nivel do indice UV.
 */
const getUvLevelLabel = (value: number): string => {
  if (value >= 8) {
    return 'Muito alto';
  }
  if (value >= 6) {
    return 'Alto';
  }
  if (value >= 3) {
    return 'Moderado';
  }
  return 'Baixo';
};

/**
 * Formata o indice UV com nivel.
 */
const formatUvIndex = (value: number): string => {
  return `${value.toFixed(1)} (${getUvLevelLabel(value)})`;
};

/**
 * Formata a lista de alertas.
 */
const formatAlerts = (alerts: string[]): string => {
  if (alerts.length === 0) {
    return 'Sem alertas';
  }
  const preview = alerts.slice(0, 2).join(', ');
  const extra = alerts.length > 2 ? ` +${alerts.length - 2}` : '';
  return `${alerts.length} alerta(s): ${preview}${extra}`;
};

/**
 * Formata a precipitacao do dia em mm.
 */
const formatPrecipitation = (rain: number, snow: number): string => {
  const total = rain + snow;
  if (total === 0) {
    return '0 mm';
  }
  if (rain > 0 && snow > 0) {
    return `Chuva ${rain.toFixed(1)} mm / Neve ${snow.toFixed(1)} mm`;
  }
  if (rain > 0) {
    return `Chuva ${rain.toFixed(1)} mm`;
  }
  if (snow > 0) {
    return `Neve ${snow.toFixed(1)} mm`;
  }
  return `${total.toFixed(1)} mm`;
};

/**
 * Gera recomendacao baseada no resumo do dia.
 */
const getSummaryRecommendation = (description: string): string => {
  const normalized = normalizeText(description);
  if (
    normalized.includes('chuva') ||
    normalized.includes('garoa') ||
    normalized.includes('tempestade')
  ) {
    return 'Leve guarda-chuva e planeje deslocamentos.';
  }
  if (normalized.includes('neve')) {
    return 'Use roupas quentes e calcado antiderrapante.';
  }
  if (normalized.includes('ceu limpo')) {
    return 'Bom para atividades ao ar livre.';
  }
  if (normalized.includes('nublado') || normalized.includes('nuvens')) {
    return 'Clima ameno para caminhadas leves.';
  }
  return 'Planeje o dia conforme a condicao.';
};

/**
 * Gera recomendacao baseada na temperatura.
 */
const getTemperatureRecommendation = (min: number, max: number): string => {
  if (max >= 30) {
    return 'Hidrate-se e evite sol forte.';
  }
  if (min <= 12) {
    return 'Leve casaco para o frio.';
  }
  return 'Temperatura agradavel para o dia.';
};

/**
 * Gera recomendacao baseada na sensacao termica.
 */
const getFeelsLikeRecommendation = (feelsLike: number): string => {
  if (feelsLike >= 30) {
    return 'Prefira locais ventilados e sombra.';
  }
  if (feelsLike <= 12) {
    return 'Use roupas mais quentes.';
  }
  return 'Sensacao termica confortavel.';
};

/**
 * Gera recomendacao baseada na chance de chuva.
 */
const getRainChanceRecommendation = (pop: number): string => {
  if (pop >= 0.6) {
    return 'Alta chance de chuva: leve guarda-chuva.';
  }
  if (pop >= 0.3) {
    return 'Considere capa leve para chuva.';
  }
  return 'Baixa chance de chuva.';
};

/**
 * Gera recomendacao baseada no vento.
 */
const getWindRecommendation = (speed: number): string => {
  const speedKmh = speed * 3.6;
  if (speedKmh >= 35) {
    return 'Vento forte: evite areas abertas.';
  }
  if (speedKmh >= 20) {
    return 'Vento moderado: prenda objetos leves.';
  }
  return 'Vento leve para o dia.';
};

/**
 * Gera recomendacao baseada na umidade.
 */
const getHumidityRecommendation = (humidity: number): string => {
  if (humidity >= 80) {
    return 'Ambiente umido: ventile o local.';
  }
  if (humidity <= 30) {
    return 'Umidade baixa: hidrate-se.';
  }
  return 'Umidade em nivel confortavel.';
};

/**
 * Gera recomendacao baseada no indice UV.
 */
const getUvRecommendation = (uv: number): string => {
  if (uv >= 8) {
    return 'Use protetor alto e evite sol forte.';
  }
  if (uv >= 6) {
    return 'Use protetor solar e oculos.';
  }
  if (uv >= 3) {
    return 'Protetor recomendado para o dia.';
  }
  return 'Baixo indice UV: protecao basica.';
};

/**
 * Gera recomendacao baseada na cobertura de nuvens.
 */
const getCloudsRecommendation = (clouds: number): string => {
  if (clouds >= 70) {
    return 'Ceo fechado: boa luz para telas.';
  }
  if (clouds <= 20) {
    return 'Ceo aberto: aproveite luz natural.';
  }
  return 'Ceo parcialmente nublado.';
};

/**
 * Gera recomendacao baseada nos horarios de sol.
 */
const getSunTimesRecommendation = (): string => {
  return 'Planeje atividades externas entre esses horarios.';
};

/**
 * Gera recomendacao baseada em alertas meteorologicos.
 */
const getAlertsRecommendation = (alerts: string[]): string => {
  if (alerts.length > 0) {
    return 'Siga as orientacoes oficiais.';
  }
  return 'Sem alertas relevantes.';
};

/**
 * Gera recomendacao baseada na precipitacao.
 */
const getPrecipitationRecommendation = (rain: number, snow: number): string => {
  const total = rain + snow;
  if (total >= 5) {
    return 'Chuva significativa: leve guarda-chuva.';
  }
  if (total > 0) {
    return 'Chuva leve: leve guarda-chuva.';
  }
  return 'Sem precipitacao prevista.';
};

/**
 * Monta as linhas da tabela de clima.
 */
export const buildWeatherRows = (snapshot: WeatherSnapshot): WeatherRow[] => {
  return [
    {
      id: 'summary',
      label: 'Resumo do dia',
      value: capitalizeText(snapshot.description),
      recommendation: getSummaryRecommendation(snapshot.description),
    },
    {
      id: 'temperature',
      label: 'Temperatura',
      value: formatTemperatureRange(snapshot.temperature),
      recommendation: getTemperatureRecommendation(
        snapshot.temperature.min,
        snapshot.temperature.max
      ),
    },
    {
      id: 'feelsLike',
      label: 'Sensacao termica',
      value: formatTemperatureValue(snapshot.feelsLike),
      recommendation: getFeelsLikeRecommendation(snapshot.feelsLike),
    },
    {
      id: 'rainChance',
      label: 'Chance de chuva',
      value: formatRainChance(snapshot.pop),
      recommendation: getRainChanceRecommendation(snapshot.pop),
    },
    {
      id: 'wind',
      label: 'Vento',
      value: formatWind(snapshot.wind.speed, snapshot.wind.deg),
      recommendation: getWindRecommendation(snapshot.wind.speed),
    },
    {
      id: 'humidity',
      label: 'Umidade',
      value: `${Math.round(snapshot.humidity)}%`,
      recommendation: getHumidityRecommendation(snapshot.humidity),
    },
    {
      id: 'uvIndex',
      label: 'Indice UV',
      value: formatUvIndex(snapshot.uvIndex),
      recommendation: getUvRecommendation(snapshot.uvIndex),
    },
    {
      id: 'clouds',
      label: 'Nuvens',
      value: `${Math.round(snapshot.clouds)}%`,
      recommendation: getCloudsRecommendation(snapshot.clouds),
    },
    {
      id: 'sunTimes',
      label: 'Nascer e por do sol',
      value: formatSunTimes(snapshot.sunrise, snapshot.sunset),
      recommendation: getSunTimesRecommendation(),
    },
    {
      id: 'alerts',
      label: 'Alertas',
      value: formatAlerts(snapshot.alerts),
      recommendation: getAlertsRecommendation(snapshot.alerts),
    },
    {
      id: 'precipitation',
      label: 'Precipitacao',
      value: formatPrecipitation(
        snapshot.precipitation.rain,
        snapshot.precipitation.snow
      ),
      recommendation: getPrecipitationRecommendation(
        snapshot.precipitation.rain,
        snapshot.precipitation.snow
      ),
    },
  ];
};
