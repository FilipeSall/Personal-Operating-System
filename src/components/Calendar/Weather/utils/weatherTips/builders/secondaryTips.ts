import type { WeatherSnapshot, WeatherTip, WeatherTipKind } from '../../../../../../types/weather';
import { buildWeatherTipSignals } from '../signals';
import { calculateHeatIndex } from '../metrics';
import { createTip, pushUniqueTip } from '../tipUtils';

/**
 * Monta uma lista de dicas secundarias a partir dos dados do dia.
 */
export const buildSecondaryTips = (
  snapshot: WeatherSnapshot,
  primaryKind: WeatherTipKind,
  selectedDate: Date
): WeatherTip[] => {
  const tips: WeatherTip[] = [];
  const usedKinds = new Set<WeatherTipKind>([primaryKind]);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const humidity = Math.round(snapshot.humidity);
  const temp = Math.round(snapshot.temperature.current);
  const feelsLike = Math.round(snapshot.feelsLike);
  const heatIndex = calculateHeatIndex(temp, humidity);
  const uvIndex = snapshot.uvIndex;
  const tempRange = Math.round(snapshot.temperature.max - snapshot.temperature.min);
  const precipitationTotal = snapshot.precipitation.rain + snapshot.precipitation.snow;
  const clouds = Math.round(snapshot.clouds);
  const popPercent = Math.round(snapshot.pop * 100);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (signals.isNearSunrise) {
    pushUniqueTip(
      tips,
      createTip(
        'sunrise-window',
        'Amanhecer',
        'Aproveite o nascer do sol: luz suave e clima bom pra uma caminhada leve.',
        'sun'
      ),
      usedKinds
    );
  }

  if (signals.isNearSunset) {
    pushUniqueTip(
      tips,
      createTip(
        'sunset-window',
        'Pôr do sol',
        'Pôr do sol por perto. Hora perfeita pra fotos e um respiro no fim do dia.',
        'sun'
      ),
      usedKinds
    );
  }

  if (uvIndex >= 6) {
    const uvMessage = signals.isNight
      ? `UV alto (${uvIndex.toFixed(1)}) durante o dia. Protetor solar FPS 30+ segue essencial.`
      : `UV alto (${uvIndex.toFixed(1)}). Use protetor solar FPS 30+ e reaplique a cada 2 horas.`;
    pushUniqueTip(
      tips,
      createTip(
        'uv-high',
        'Proteção UV',
        uvMessage,
        'uv'
      ),
      usedKinds
    );
  }

  if (windKmh >= 25) {
    pushUniqueTip(
      tips,
      createTip(
        'wind-strong',
        'Vento forte',
        `Vento de ${windKmh} km/h. Proteja objetos que possam ser levados pelo vento.`,
        'wind'
      ),
      usedKinds
    );
  }

  if (humidity >= 75 && windKmh <= 10) {
    const isMuggyHot = heatIndex >= 30 || feelsLike >= 30;
    const humidityLabel = isMuggyHot ? 'Ar abafado' : 'Umidade alta';
    const humidityMessage = isMuggyHot
      ? `Umidade em ${humidity}%. Sensação de ${heatIndex}°C com pouco vento. Beba bastante água e evite atividades físicas intensas.`
      : `Umidade em ${humidity}% com pouco vento. O ar fica pesado; ventile os ambientes e prefira roupas leves.`;
    pushUniqueTip(
      tips,
      createTip(
        'humidity-high',
        humidityLabel,
        humidityMessage,
        'humidity'
      ),
      usedKinds
    );
  }

  if (humidity <= 30) {
    pushUniqueTip(
      tips,
      createTip(
        'humidity-low',
        'Ar seco',
        `Umidade em ${humidity}%. Mantenha-se hidratado e use hidratante para pele e lábios.`,
        'humidity'
      ),
      usedKinds
    );
  }

  if (tempRange >= 10) {
    pushUniqueTip(
      tips,
      createTip(
        'temp-range',
        'Camadas',
        `Amplitude térmica de ${tempRange}°C. Vista-se em camadas para ajustar ao longo do dia.`,
        'temperature'
      ),
      usedKinds
    );
  }

  if (precipitationTotal >= 5) {
    pushUniqueTip(
      tips,
      createTip(
        'precipitation',
        'Chuva acumulada',
        `Acumulado de ${precipitationTotal.toFixed(1)} mm (chuva de ${precipitationTotal.toFixed(1)} L por m²). Evite áreas com risco de alagamento.`,
        'precipitation'
      ),
      usedKinds
    );
  }

  if (clouds >= 70) {
    const cloudMessage = signals.isNight
      ? `Noite com ${clouds}% de nuvens. Se for sair, luz extra ajuda na visibilidade.`
      : `Nuvens em ${clouds}%. A luz fica mais suave, quase um filtro natural. Se precisar de foco, liga uma luz extra.`;
    pushUniqueTip(
      tips,
      createTip(
        'clouds',
        'Céu fechado',
        cloudMessage,
        'clouds'
      ),
      usedKinds
    );
  }

  if (popPercent >= 50) {
    pushUniqueTip(
      tips,
      createTip(
        'rain-chance',
        'Chance de chuva',
        `Chance de chuva ${popPercent}%. Leve guarda-chuva, ele adora um passeio.`,
        'rain'
      ),
      usedKinds
    );
  }

  return tips;
};
