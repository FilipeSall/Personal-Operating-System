import type { WeatherSnapshot, WeatherTip } from '../../../../../../types/weather';
import { capitalizeText, normalizeText } from '../text';
import { createTip } from '../tipUtils';
import { buildDaylightSignals, isSameLocalDay } from '../signals';

/**
 * Cria a dica principal usando a descricao e cruzando dados do dia.
 */
export const buildPrimaryTip = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip => {
  const normalized = normalizeText(snapshot.description);
  const descriptionLabel = capitalizeText(snapshot.description);
  const descriptionText = descriptionLabel ? `"${descriptionLabel}"` : 'o tempo';
  const popPercent = Math.round(snapshot.pop * 100);
  const precipitationTotal = snapshot.precipitation.rain + snapshot.precipitation.snow;
  const maxTemp = Math.round(snapshot.temperature.max);
  const minTemp = Math.round(snapshot.temperature.min);
  const feelsLike = Math.round(snapshot.feelsLike);
  const clouds = Math.round(snapshot.clouds);
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const now = new Date();
  const isToday = isSameLocalDay(selectedDate, now);
  const daylightSignals = isToday
    ? buildDaylightSignals(snapshot, now)
    : {
      isNight: false,
      isMorning: false,
      isAfternoon: false,
      isEvening: false,
      isNearSunrise: false,
      isNearSunset: false,
    };
  const isNight = daylightSignals.isNight;
  const isAfternoon = daylightSignals.isAfternoon;

  if (
    normalized.includes('tempestade') ||
    normalized.includes('trovoada') ||
    normalized.includes('storm') ||
    normalized.includes('thunder')
  ) {
    const precipitationLabel =
      precipitationTotal > 0
        ? `${precipitationTotal.toFixed(1)} mm`
        : 'pancadas fortes';
    return createTip(
      'primary-storm',
      'Dica do dia',
      `Com ${descriptionText}, a previsão aponta ${precipitationLabel} de precipitação. Se possível, evite sair de casa.`,
      'storm'
    );
  }

  if (
    normalized.includes('chuva') ||
    normalized.includes('garoa') ||
    normalized.includes('chuvisco') ||
    normalized.includes('drizzle') ||
    normalized.includes('rain')
  ) {
    const chanceLabel = popPercent > 0 ? `${popPercent}%` : 'considerável';
    return createTip(
      'primary-rain',
      'Dica do dia',
      `Com ${descriptionText}, a chance de chuva é ${chanceLabel}. Leve guarda-chuva para evitar surpresas.`,
      'rain'
    );
  }

  if (
    normalized.includes('neve') ||
    normalized.includes('granizo') ||
    normalized.includes('snow')
  ) {
    return createTip(
      'primary-snow',
      'Dica do dia',
      `Com ${descriptionText} e mínima de ${minTemp}°C, use agasalhos apropriados e caminhe com cuidado.`,
      'snow'
    );
  }

  if (
    normalized.includes('nevoa') ||
    normalized.includes('neblina') ||
    normalized.includes('nevoeiro') ||
    normalized.includes('mist') ||
    normalized.includes('fog')
  ) {
    return createTip(
      'primary-fog',
      'Dica do dia',
      `Com ${descriptionText} e umidade em ${humidity}%, dirija com atenção redobrada e farol baixo.`,
      'fog'
    );
  }

  if (normalized.includes('vento') || normalized.includes('ventania')) {
    return createTip(
      'primary-wind',
      'Dica do dia',
      `Com ${descriptionText} e vento de ${windKmh} km/h, proteja objetos leves e use roupas adequadas.`,
      'wind'
    );
  }

  if (
    normalized.includes('ceu limpo') ||
    normalized.includes('ensolarado') ||
    normalized.includes('sol') ||
    normalized.includes('clear')
  ) {
    if (isNight) {
      return createTip(
        'primary-sun-night',
        'Dica do dia',
        `Com ${descriptionText}, a noite tende a ficar limpa. Boa chance de ver estrelas (e fugir do calor do dia).`,
        'sun'
      );
    }
    const sunTiming = isToday ? (isAfternoon ? 'À tarde' : 'Durante o dia') : '';
    const sunPrefix = sunTiming ? `${sunTiming}, ` : '';
    return createTip(
      'primary-sun',
      'Dica do dia',
      `${sunPrefix}com ${descriptionText}, a máxima chega a ${maxTemp}°C. Use protetor solar e mantenha-se bem hidratado.`,
      'sun'
    );
  }

  if (normalized.includes('nublado') || normalized.includes('nuvens') || normalized.includes('cloud')) {
    const cloudLabel =
      clouds <= 40
        ? 'sol aparece com frequência'
        : clouds <= 70
          ? 'luz alterna entre sol e sombra'
          : 'luz bem difusa e pouca abertura de sol';
    const cloudPunch =
      clouds <= 40
        ? 'Ótimo para atividades externas sem torrar.'
        : clouds <= 70
          ? 'Bom para passeios sem o sol no talo.'
          : 'Perfeito para evitar clarão direto.';
    const cloudNightLabel =
      clouds <= 40
        ? 'a noite deve ficar mais aberta'
        : clouds <= 70
          ? 'a noite fica com nuvens alternando'
          : 'a noite tende a ficar bem fechada';
    const cloudNightPunch =
      clouds <= 40
        ? 'Boa chance de céu estrelado.'
        : clouds <= 70
          ? 'Clima bom pra um passeio leve.'
          : 'Noite ótima pra luz indireta e descanso.';
    const cloudPrefix = isToday ? (isAfternoon ? 'À tarde, ' : 'Durante o dia, ') : '';
    return createTip(
      'primary-clouds',
      'Dica do dia',
      isNight
        ? `Com ${descriptionText} e ${clouds}% de nuvens, ${cloudNightLabel}. ${cloudNightPunch}`
        : `${cloudPrefix}com ${descriptionText} e ${clouds}% de nuvens, ${cloudLabel}. ${cloudPunch}`,
      'clouds'
    );
  }

  return createTip(
    'primary-generic',
    'Dica do dia',
    `Clima equilibrado com sensação de ${feelsLike}°C. Vista-se confortavelmente com camadas leves.`,
    'generic'
  );
};
