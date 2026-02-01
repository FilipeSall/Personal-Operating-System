import type { WeatherSnapshot, WeatherTip, WeatherTipKind } from '../../../../types/weather';

export type WeatherTipsInput = {
  snapshot: WeatherSnapshot;
  selectedDate: Date;
};

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
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Cria um id de dica consistente.
 */
const createTip = (id: string, label: string, message: string, kind: WeatherTipKind): WeatherTip => {
  return {
    id,
    label,
    message,
    kind,
  };
};

/**
 * Gera um hash simples para textos.
 */
const hashText = (value: string): number => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

/**
 * Cria um gerador pseudo-aleatorio com seed.
 */
const createSeededRandom = (seed: number): (() => number) => {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Embaralha as dicas usando uma seed deterministica.
 */
const shuffleTips = (tips: WeatherTip[], seed: number): WeatherTip[] => {
  const random = createSeededRandom(seed);
  const output = [...tips];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
};

/**
 * Monta uma seed usando a data e a descricao do clima.
 */
const buildTipSeed = (selectedDate: Date, description: string): number => {
  const dateSeed =
    selectedDate.getFullYear() * 10000 +
    (selectedDate.getMonth() + 1) * 100 +
    selectedDate.getDate();
  return dateSeed + hashText(description);
};

/**
 * Calcula o índice de calor (heat index) combinando temperatura e umidade.
 * Retorna a sensação térmica real quando está quente e úmido.
 */
const calculateHeatIndex = (temp: number, humidity: number): number => {
  if (temp < 27) return temp;

  const c1 = -8.78469475556;
  const c2 = 1.61139411;
  const c3 = 2.33854883889;
  const c4 = -0.14611605;
  const c5 = -0.012308094;
  const c6 = -0.0164248277778;
  const c7 = 0.002211732;
  const c8 = 0.00072546;
  const c9 = -0.000003582;

  const hi = c1 + (c2 * temp) + (c3 * humidity) +
             (c4 * temp * humidity) + (c5 * temp * temp) +
             (c6 * humidity * humidity) + (c7 * temp * temp * humidity) +
             (c8 * temp * humidity * humidity) +
             (c9 * temp * temp * humidity * humidity);

  return Math.round(hi);
};

/**
 * Calcula a sensação térmica com vento frio (wind chill).
 */
const calculateWindChill = (temp: number, windKmh: number): number => {
  if (temp > 10 || windKmh < 4.8) return temp;

  const wc = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windKmh, 0.16) +
         0.3965 * temp * Math.pow(windKmh, 0.16);

  return Math.round(wc);
};

/**
 * Detecta condição de "sufoco" (muito calor + muita umidade + sem vento).
 */
const isMiserable = (temp: number, humidity: number, windKmh: number): boolean => {
  return temp >= 28 && humidity >= 70 && windKmh <= 10;
};

/**
 * Detecta "vento cortante" (frio + vento forte).
 */
const hasWindChill = (temp: number, windKmh: number): boolean => {
  return temp <= 10 && windKmh >= 20;
};

/**
 * Detecta "dia do cabelo rebelde" (umidade + vento + chuva).
 */
const isBadHairDay = (humidity: number, windKmh: number, pop: number): boolean => {
  return humidity >= 70 && windKmh >= 15 && pop >= 0.3;
};

/**
 * Detecta clima perfeito para atividades ao ar livre.
 */
const isPerfectDay = (
  temp: number,
  humidity: number,
  windKmh: number,
  pop: number,
  clouds: number
): boolean => {
  return temp >= 20 && temp <= 26 &&
         humidity >= 40 && humidity <= 60 &&
         windKmh <= 15 &&
         pop <= 0.2 &&
         clouds >= 20 && clouds <= 50;
};

/**
 * Detecta condições ideais para exercícios ao ar livre.
 */
const isWorkoutWeather = (
  temp: number,
  humidity: number,
  uvIndex: number,
  windKmh: number
): boolean => {
  return temp >= 18 && temp <= 24 &&
         humidity <= 70 &&
         (uvIndex === 0 || uvIndex <= 6) &&
         windKmh <= 20;
};

/**
 * Detecta frio enganador (temperatura ok mas sensação fria).
 */
const isDeceptivelyCold = (temp: number, clouds: number, windKmh: number): boolean => {
  return temp >= 15 && temp <= 22 && clouds >= 60 && windKmh >= 15;
};

/**
 * Cria a dica principal usando a descricao e cruzando dados do dia.
 */
const buildPrimaryTip = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip => {
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

/**
 * Cria a dica de alertas quando houver avisos oficiais.
 */
const buildAlertTip = (alerts: string[]): WeatherTip | null => {
  if (alerts.length === 0) {
    return null;
  }

  const preview = alerts[0] ?? 'Alerta meteorologico';
  const trimmedPreview = preview.length > 60 ? `${preview.slice(0, 57)}...` : preview;
  const label = alerts.length > 1 ? 'Alertas' : 'Alerta';

  return createTip(
    'alert',
    label,
    `Tem ${alerts.length} alerta(s) ativo(s). ${trimmedPreview}. Melhor nao brincar com a natureza hoje.`,
    'alert'
  );
};

/**
 * Cria dica de "sufoco" quando está muito quente, úmido e sem vento.
 */
const buildMiseryTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.max);
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!isMiserable(temp, humidity, windKmh)) {
    return null;
  }

  const heatIndex = calculateHeatIndex(temp, humidity);

  return createTip(
    'misery-index',
    'Calor abafado',
    `Sensação de ${heatIndex}°C com ${humidity}% de umidade e pouco vento. Mantenha-se hidratado e evite atividades intensas.`,
    'composite'
  );
};

/**
 * Cria dica de vento cortante (frio + vento).
 */
const buildWindChillTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.min);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!hasWindChill(temp, windKmh)) {
    return null;
  }

  const windChill = calculateWindChill(temp, windKmh);

  return createTip(
    'wind-chill',
    'Vento gelado',
    `Sensação de ${windChill}°C com o vento de ${windKmh} km/h. Use casaco corta-vento e proteja extremidades.`,
    'composite'
  );
};

/**
 * Dica de "bad hair day" (umidade + vento + chuva).
 */
const buildBadHairDayTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const pop = snapshot.pop;

  if (!isBadHairDay(humidity, windKmh, pop)) {
    return null;
  }

  return createTip(
    'bad-hair-day',
    'Cabelo rebelde',
    `Umidade de ${humidity}%, vento de ${windKmh} km/h e chance de chuva. Opte por penteados presos ou proteja com chapéu.`,
    'composite'
  );
};

/**
 * Dica de frio enganador.
 */
const buildDeceptiveColdTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const clouds = Math.round(snapshot.clouds);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!isDeceptivelyCold(temp, clouds, windKmh)) {
    return null;
  }

  return createTip(
    'deceptively-cold',
    'Frio aparente',
    `${temp}°C parece ameno, mas nublado com vento cria sensação mais fria. Leve casaco leve por precaução.`,
    'composite'
  );
};

/**
 * Dica de clima perfeito para atividades ao ar livre.
 */
const buildPerfectDayTip = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const pop = snapshot.pop;
  const clouds = Math.round(snapshot.clouds);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (!isPerfectDay(temp, humidity, windKmh, pop, clouds)) {
    return null;
  }

  const perfectCopy = signals.isNight
    ? `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Noite ótima para um passeio leve.`
    : signals.isAfternoon
      ? `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Tarde excelente para atividades ao ar livre.`
      : `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Excelente dia para atividades ao ar livre.`;

  return createTip(
    'perfect-day',
    'Clima ideal',
    perfectCopy,
    'positive'
  );
};

/**
 * Dica de clima perfeito para exercícios.
 */
const buildWorkoutTip = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const humidity = Math.round(snapshot.humidity);
  const uvIndex = snapshot.uvIndex;
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (!isWorkoutWeather(temp, humidity, uvIndex, windKmh)) {
    return null;
  }

  const workoutCopy = signals.isNight
    ? `Condições ideais para exercícios leves: ${temp}°C e umidade controlada. Noite boa pra se mexer.`
    : signals.isAfternoon
      ? `Condições ideais para exercícios ao ar livre: ${temp}°C e umidade controlada. Tarde boa pra treinar.`
      : `Condições ideais para exercícios ao ar livre: ${temp}°C e umidade controlada. Aproveite para se movimentar.`;

  return createTip(
    'workout-weather',
    'Clima de treino',
    workoutCopy,
    'positive'
  );
};

/**
 * Adiciona uma dica se o tipo ainda nao foi usado.
 */
const pushUniqueTip = (tips: WeatherTip[], tip: WeatherTip, usedKinds: Set<WeatherTipKind>) => {
  if (usedKinds.has(tip.kind)) {
    return;
  }
  tips.push(tip);
  usedKinds.add(tip.kind);
};

/**
 * Monta uma lista de dicas secundarias a partir dos dados do dia.
 */
const buildSecondaryTips = (
  snapshot: WeatherSnapshot,
  primaryKind: WeatherTipKind,
  selectedDate: Date
): WeatherTip[] => {
  const tips: WeatherTip[] = [];
  const usedKinds = new Set<WeatherTipKind>([primaryKind]);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const humidity = Math.round(snapshot.humidity);
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
    pushUniqueTip(
      tips,
      createTip(
        'humidity-high',
        'Ar abafado',
        `Umidade em ${humidity}%. Beba bastante água e evite atividades físicas intensas.`,
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

/**
 * Gera dicas coringa para completar a lista.
 */
const buildFallbackTips = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip[] => {
  const tips: WeatherTip[] = [];
  const maxTemp = Math.round(snapshot.temperature.max);
  const minTemp = Math.round(snapshot.temperature.min);
  const feelsLike = Math.round(snapshot.feelsLike);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (maxTemp >= 30) {
    tips.push(
      createTip(
        'fallback-heat',
        'Hidratação',
        `Máxima de ${maxTemp}°C. Mantenha-se bem hidratado durante todo o dia.`,
        'temperature'
      )
    );
  }

  if (minTemp <= 12) {
    tips.push(
      createTip(
        'fallback-cold',
        'Agasalho',
        `Mínima de ${minTemp}°C. Leve casaco para o período da manhã e noite.`,
        'temperature'
      )
    );
  }

  tips.push(
    createTip(
      'fallback-balance',
      'Ritmo leve',
      `Sensação de ${feelsLike}°C. Temperatura agradável para atividades diversas.`,
      'generic'
    )
  );

  tips.push(...buildRoutineTips(signals));
  tips.push(...buildQuickCheckTips(signals));

  return tips;
};

/**
 * Tipo para pool de dicas com peso de prioridade.
 */
type TipPool = {
  tips: WeatherTip[];
  weight: number;
};

type WeatherTipSignals = {
  isWeekend: boolean;
  isToday: boolean;
  isFuture: boolean;
  isStorm: boolean;
  isRainy: boolean;
  isSnowy: boolean;
  isSunny: boolean;
  isOvercast: boolean;
  isMostlyCloudy: boolean;
  isPartlyCloudy: boolean;
  isHot: boolean;
  isCold: boolean;
  isWindy: boolean;
  isNight: boolean;
  isMorning: boolean;
  isAfternoon: boolean;
  isEvening: boolean;
  isNearSunrise: boolean;
  isNearSunset: boolean;
  popPercent: number;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  tempCurrent: number;
  cloudCover: number;
};

type DaylightSignals = {
  isNight: boolean;
  isMorning: boolean;
  isAfternoon: boolean;
  isEvening: boolean;
  isNearSunrise: boolean;
  isNearSunset: boolean;
};

const SUN_WINDOW_MINUTES = 45;

/**
 * Verifica se duas datas sao do mesmo dia (fuso local).
 */
function isSameLocalDay(left: Date, right: Date): boolean {
  return left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate();
}

/**
 * Indica se a data alvo e futura em relacao ao dia atual (fuso local).
 */
function isFutureLocalDay(target: Date, now: Date): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return targetDay.getTime() > today.getTime();
}

/**
 * Ajusta mensagens para dias futuros (tom de previsao/preparo).
 */
const formatFutureTipMessage = (message: string): string => {
  const sanitized = message.replace(/\bhoje\b/gi, 'nesse dia');
  if (sanitized.startsWith('Previsão') || sanitized.startsWith('Para esse dia')) {
    return sanitized;
  }
  return `Para esse dia, ${sanitized}`;
};

/**
 * Gera sinais do período do dia e proximidade de nascer/pôr do sol.
 */
function buildDaylightSignals(snapshot: WeatherSnapshot, now: Date): DaylightSignals {
  const sunrise = new Date(snapshot.sunrise * 1000);
  const sunset = new Date(snapshot.sunset * 1000);
  const isNight = now < sunrise || now > sunset;
  const hour = now.getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 18;
  const isEvening = hour >= 18 || hour < 5;
  const minutesToSunrise = Math.abs(now.getTime() - sunrise.getTime()) / (60 * 1000);
  const minutesToSunset = Math.abs(now.getTime() - sunset.getTime()) / (60 * 1000);

  return {
    isNight,
    isMorning,
    isAfternoon,
    isEvening,
    isNearSunrise: minutesToSunrise <= SUN_WINDOW_MINUTES,
    isNearSunset: minutesToSunset <= SUN_WINDOW_MINUTES,
  };
}

/**
 * Resume sinais do clima e do dia para variar dicas de rotina.
 */
function buildWeatherTipSignals(
  snapshot: WeatherSnapshot,
  selectedDate: Date
): WeatherTipSignals {
  const now = new Date();
  const isToday = isSameLocalDay(selectedDate, now);
  const isFuture = isFutureLocalDay(selectedDate, now);
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
  const normalized = normalizeText(snapshot.description);
  const popPercent = Math.round(snapshot.pop * 100);
  const maxTemp = Math.round(snapshot.temperature.max);
  const minTemp = Math.round(snapshot.temperature.min);
  const tempCurrent = Math.round(snapshot.temperature.current);
  const feelsLike = Math.round(snapshot.feelsLike);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const isStorm =
    normalized.includes('tempestade') ||
    normalized.includes('trovoada') ||
    normalized.includes('storm') ||
    normalized.includes('thunder');
  const isSnowy =
    normalized.includes('neve') ||
    normalized.includes('granizo') ||
    normalized.includes('snow') ||
    snapshot.precipitation.snow > 0;
  const isRainy =
    normalized.includes('chuva') ||
    normalized.includes('garoa') ||
    normalized.includes('chuvisco') ||
    normalized.includes('drizzle') ||
    normalized.includes('rain') ||
    snapshot.precipitation.rain > 0 ||
    popPercent >= 50;
  const cloudCover = Math.round(snapshot.clouds);
  const isOvercast =
    cloudCover >= 80 ||
    normalized.includes('encoberto') ||
    normalized.includes('overcast') ||
    normalized.includes('ceu fechado');
  const isMostlyCloudy = cloudCover >= 60 && cloudCover < 80;
  const isPartlyCloudy =
    (cloudCover >= 25 && cloudCover < 60) ||
    normalized.includes('nuvens dispersas') ||
    normalized.includes('poucas nuvens') ||
    normalized.includes('scattered') ||
    normalized.includes('few clouds');
  const isSunny =
    (normalized.includes('ceu limpo') ||
      normalized.includes('ensolarado') ||
      normalized.includes('clear') ||
      (normalized.includes('sol') && cloudCover <= 50)) &&
    cloudCover <= 40 &&
    snapshot.pop <= 0.2;
  const isHot = maxTemp >= 30 || feelsLike >= 30;
  const isCold = minTemp <= 10 || feelsLike <= 12;
  const isWindy = windKmh >= 25;
  const isWeekend = [0, 6].includes(selectedDate.getDay());

  return {
    isWeekend,
    isToday,
    isFuture,
    isStorm,
    isRainy,
    isSnowy,
    isSunny,
    isOvercast,
    isMostlyCloudy,
    isPartlyCloudy,
    isHot,
    isCold,
    isWindy,
    isNight: daylightSignals.isNight,
    isMorning: daylightSignals.isMorning,
    isAfternoon: daylightSignals.isAfternoon,
    isEvening: daylightSignals.isEvening,
    isNearSunrise: isToday && daylightSignals.isNearSunrise && !isRainy && !isSnowy && !isStorm,
    isNearSunset: isToday && daylightSignals.isNearSunset && !isRainy && !isSnowy && !isStorm,
    popPercent,
    maxTemp,
    minTemp,
    feelsLike,
    tempCurrent,
    cloudCover,
  };
}

/**
 * Gera dicas de rotina com base no clima e no dia da semana.
 */
const buildRoutineTips = (signals: WeatherTipSignals): WeatherTip[] => {
  const tips: WeatherTip[] = [];

  if (signals.isFuture) {
    if (signals.isSnowy) {
      tips.push(
        createTip(
          'fallback-routine-future-snow-1',
          'Rotina',
          'Neve prevista: programe deslocamentos com folga e separe roupas térmicas. Seu futuro eu agradece.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isStorm) {
      tips.push(
        createTip(
          'fallback-routine-future-storm-1',
          'Rotina',
          'Tempestade prevista: remarca tarefas externas e deixe o guarda-chuva no modo prontidão.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isRainy) {
      tips.push(
        createTip(
          'fallback-routine-future-rain-1',
          'Rotina',
          signals.isWeekend
            ? 'Chuva prevista no fds: planeje rolês cobertos e leve capa/guarda-chuva na bolsa.'
            : 'Chuva prevista: planeje rotas cobertas e leve capa/guarda-chuva na bolsa.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny && signals.isHot) {
      tips.push(
        createTip(
          'fallback-routine-future-sun-hot-1',
          'Rotina',
          signals.isWeekend
            ? 'Calor previsto no fds: programe academia e alguma atividade com água (clube/piscina).'
            : 'Calor previsto: roupas leves e água por perto. Planejamento evita perrengue.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny) {
      tips.push(
        createTip(
          'fallback-routine-future-sun-1',
          'Rotina',
          signals.isWeekend
            ? 'Tempo aberto no fds: ótimo pra passeio e atividades ao ar livre. Separe protetor e óculos.'
            : 'Tempo aberto previsto: boa chance de agenda externa. Separe protetor e óculos.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isOvercast || signals.isMostlyCloudy || signals.isPartlyCloudy) {
      tips.push(
        createTip(
          'fallback-routine-future-clouds-1',
          'Rotina',
          signals.isWeekend
            ? 'Nuvens previstas no fds: clima estável pra passeios sem calorão.'
            : 'Nuvens previstas: clima mais estável e sem calorão. Planeje atividades sem sofrer no sol.',
          'generic'
        )
      );
      return tips;
    }

    tips.push(
      createTip(
        'fallback-routine-future-generic-1',
        'Rotina',
        signals.isWeekend
          ? 'Fim de semana à vista: organize a agenda com base na previsão e prepare o rolê.'
          : 'Dia futuro: organize a agenda com base na previsão. Deixe a mochila pronta e evite correria.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isWeekend) {
    if (signals.isNight && (signals.isSunny || signals.isPartlyCloudy || signals.isMostlyCloudy)) {
      tips.push(
        createTip(
          'fallback-routine-weekend-night-1',
          'Rotina',
          'Noite de tempo estável: passeio leve, comida na rua ou filme ao ar livre. Sem sol, sem pressa.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSnowy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-snow-1',
          'Rotina',
          'Neve no fim de semana: boneco de neve, chocolate quente e fotos épicas. Ande devagar, o chão vira patinação.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-snow-2',
          'Rotina',
          'Nevasca leve: passeio curto e seguro, depois lareira/filme. Meias grossas são o verdadeiro luxo.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isStorm) {
      tips.push(
        createTip(
          'fallback-routine-weekend-storm-1',
          'Rotina',
          'Tempestade no fds: plano B é sofá, pipoca e jogo/filme. Evita virar pipa humana lá fora.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-storm-2',
          'Rotina',
          'Trovoadas: fique em casa, carregue os eletrônicos e curta um game. O céu hoje tá bravo.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isRainy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-rain-1',
          'Rotina',
          'Chuva no fim de semana: troca o rolê externo por cinema, museu ou maratona. Academia coberta salva o cardio.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-rain-2',
          'Rotina',
          'Dia molhado: livro, café e treino indoor. Guarda-chuva como acessório fashion involuntário.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny && signals.isHot) {
      const hotWeekendCopy = signals.isAfternoon
        ? 'Sol e calor no fds: tarde pede clube/piscina e água gelada. Hidrata e vai.'
        : 'Sol e calor no fds: de manhã, academia cedo; à tarde, clube/piscina. Hidrata e vai.';
      tips.push(
        createTip(
          'fallback-routine-weekend-sun-hot-1',
          'Rotina',
          hotWeekendCopy,
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-sun-hot-2',
          'Rotina',
          'Solzão no fim de semana: manhã de treino leve, tarde de clube ou sombra com água de coco.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny) {
      const sunnyWeekendCopy = signals.isAfternoon
        ? 'Solzinho no fds: tarde de café na rua e passeio leve. Rolê sem pressa.'
        : 'Solzinho de fim de semana: manhã de parque ou bike, tarde de café na rua. Rolê sem pressa.';
      tips.push(
        createTip(
          'fallback-routine-weekend-sun-1',
          'Rotina',
          sunnyWeekendCopy,
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-sun-2',
          'Rotina',
          'Dia aberto: caminhada cedo e depois brunch. A tarde pede passeio tranquilo.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isOvercast) {
      tips.push(
        createTip(
          'fallback-routine-weekend-overcast-1',
          'Rotina',
          'Céu fechado: museu, café ou cinema. Sem sol, sem drama.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-overcast-2',
          'Rotina',
          'Dia cinza total: rolê indoor e manta no sofá. O sol hoje entrou de folga.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isMostlyCloudy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-mostly-cloudy-1',
          'Rotina',
          signals.isAfternoon
            ? 'Nublado com brechas: tarde tranquila pra café na rua. O sol aparece, mas sem exagero.'
            : 'Nublado com brechas: passeio curto e café na rua. O sol aparece, mas sem exagero.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isPartlyCloudy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-partly-cloudy-1',
          'Rotina',
          signals.isAfternoon
            ? 'Sol e nuvens alternando: tarde ótima pra feira ou caminhada. Sem torrar, sem sumir.'
            : 'Sol e nuvens alternando: ótimo pra caminhada ou feira. Sem torrar, sem sumir.',
          'generic'
        )
      );
      return tips;
    }

    tips.push(
      createTip(
        'fallback-routine-weekend-generic-1',
        'Rotina',
        'Fim de semana livre: agenda leve, pausa sem culpa e um rolê que não começa com “só vou ali”.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isStorm) {
    tips.push(
      createTip(
        'fallback-routine-weekday-storm-1',
        'Rotina',
        'Tempestade em dia útil: se puder, home office. Se sair, saia cedo e evite áreas alagadas.',
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-storm-2',
        'Rotina',
        'Trovoadas hoje: horário flexível ajuda. Tenha capa e carregador (o clima adora desligar tudo).',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isSnowy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-snow-1',
        'Rotina',
        'Neve no expediente: saia com tempo extra, use sola aderente e leve luvas. O chão tá no modo escorregadio.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isRainy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-rain-1',
        'Rotina',
        'Chuva no expediente: planeje deslocamento e use calçado que não chora com poça.',
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-rain-2',
        'Rotina',
        'Dia chuvoso: guarda-chuva na mochila e +10 min no trajeto. Seu tênis agradece.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isHot) {
    tips.push(
      createTip(
        'fallback-routine-weekday-hot-1',
        'Rotina',
        `Calorão no trabalho: roupas leves e água por perto. ${signals.maxTemp}°C não é brincadeira.`,
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-hot-2',
        'Rotina',
        'Dia quente: programe pausas curtas pra não virar torrada. Ar-condicionado é aliado.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isCold) {
    tips.push(
      createTip(
        'fallback-routine-weekday-cold-1',
        'Rotina',
        `Frio no ar: camadas e cachecol. Mínima de ${signals.minTemp}°C pede respeito.`,
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-cold-2',
        'Rotina',
        'Dia frio: café quentinho e mãos protegidas. Produtividade gosta de calor humano.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isSunny) {
    const sunnyWeekdayCopy = signals.isNight
      ? 'Noite limpa: caminhada leve ou pausa na varanda. O sol já foi, mas o clima ajuda.'
      : signals.isAfternoon
        ? 'Tarde ensolarada: aproveite uma pausa rápida ao ar livre.'
        : 'Solzinho: aproveite o almoço ao ar livre. Vitamina D no intervalo é upgrade.';
    tips.push(
      createTip(
        'fallback-routine-weekday-sun-1',
        'Rotina',
        sunnyWeekdayCopy,
        'generic'
      )
    );
    return tips;
  }

  if (signals.isOvercast) {
    tips.push(
      createTip(
        'fallback-routine-weekday-overcast-1',
        'Rotina',
        'Céu fechado: luz baixa e clima constante. Bom dia pra foco e café.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isMostlyCloudy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-mostly-cloudy-1',
        'Rotina',
        signals.isNight
          ? 'Noite com nuvens: clima estável pra foco e descanso. Sem clarão, sem stress.'
          : 'Nublado com brechas: dá pra sair sem sol estourado. Café e produtividade em paz.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isPartlyCloudy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-partly-cloudy-1',
        'Rotina',
        signals.isNight
          ? 'Noite com nuvens alternando: passeio rápido e seguro. Luz da rua resolve.'
          : 'Sol aparecendo de vez em quando: ótimo pra uma pausa rápida ao ar livre.',
        'generic'
      )
    );
    return tips;
  }

  tips.push(
    createTip(
      'fallback-routine-weekday-generic-1',
      'Rotina',
      'Rotina padrão: previsão checada, mochila ok, vida andando. Bônus de organização desbloqueado.',
      'generic'
    )
  );
  return tips;
};

/**
 * Gera dicas curtas de check rápido baseadas no clima.
 */
const buildQuickCheckTips = (signals: WeatherTipSignals): WeatherTip[] => {
  const tips: WeatherTip[] = [];

  if (signals.isFuture && signals.isStorm) {
    tips.push(
      createTip(
        'fallback-check-future-storm-1',
        'Check rápido',
        'Tempestade prevista: carregue a bateria reserva e evite marcar compromissos ao ar livre.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isSnowy) {
    tips.push(
      createTip(
        'fallback-check-future-snow-1',
        'Check rápido',
        'Neve prevista: separe casaco térmico, luvas e calçado aderente.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isRainy) {
    tips.push(
      createTip(
        'fallback-check-future-rain-1',
        'Check rápido',
        'Chuva prevista: guarda-chuva pronto e capa na mochila. Seu tênis agradece nesse dia.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isSunny && signals.isHot) {
    tips.push(
      createTip(
        'fallback-check-future-hot-1',
        'Check rápido',
        'Calor previsto: garrafa de água e protetor separados com antecedência.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isSunny) {
    tips.push(
      createTip(
        'fallback-check-future-sun-1',
        'Check rápido',
        'Tempo aberto previsto: protetor e óculos já na mochila.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && (signals.isOvercast || signals.isMostlyCloudy || signals.isPartlyCloudy)) {
    tips.push(
      createTip(
        'fallback-check-future-clouds-1',
        'Check rápido',
        'Nuvens previstas: luz extra pode ajudar em atividades de foco.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isStorm) {
    tips.push(
      createTip(
        'fallback-check-storm-1',
        'Check rápido',
        'Capa, celular carregado e longe de janela. Hoje o céu tá elétrico.',
        'generic'
      ),
      createTip(
        'fallback-check-storm-2',
        'Check rápido',
        'Tempestade chegando: guarda-chuva firme e evita se abrigar debaixo de árvore. Árvore não é para-raios.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isSnowy) {
    tips.push(
      createTip(
        'fallback-check-snow-1',
        'Check rápido',
        'Luva, gorro e sola aderente. O chão escorrega mais que promessa.',
        'generic'
      ),
      createTip(
        'fallback-check-snow-2',
        'Check rápido',
        'Neve no radar: casaco grosso e passo curto. Andar rápido hoje é esporte radical.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isRainy) {
    tips.push(
      createTip(
        'fallback-check-rain-1',
        'Check rápido',
        'Guarda-chuva + meia extra. Poça adora tênis limpo.',
        'generic'
      ),
      createTip(
        'fallback-check-rain-2',
        'Check rápido',
        `Chance de chuva ${signals.popPercent}%. Capricha na capa, o céu tá de brincadeira.`,
        'generic'
      )
    );
  }

  if (signals.isHot) {
    tips.push(
      createTip(
        'fallback-check-hot-1',
        'Check rápido',
        'Água, protetor solar e roupa leve. Derreter não é meta.',
        'generic'
      )
    );
  }

  if (signals.isCold) {
    tips.push(
      createTip(
        'fallback-check-cold-1',
        'Check rápido',
        'Casaco, cachecol e mãos quentes. Frio gosta de dedos distraídos.',
        'generic'
      )
    );
  }

  if (signals.isWindy) {
    tips.push(
      createTip(
        'fallback-check-wind-1',
        'Check rápido',
        'Prende o cabelo e segura objetos leves. O vento tá querendo ser DJ.',
        'generic'
      )
    );
  }

  if (signals.isSunny && !signals.isHot) {
    tips.push(
      createTip(
        'fallback-check-sun-1',
        'Check rápido',
        signals.isNight
          ? 'Noite limpa: se for sair, casaco leve resolve. Céu aberto ajuda na sensação térmica.'
          : 'Óculos escuros e protetor. Sol tá no modo holofote.',
        'generic'
      )
    );
  }

  if (signals.isOvercast) {
    tips.push(
      createTip(
        'fallback-check-overcast-1',
        'Check rápido',
        'Céu bem fechado: liga uma luz extra. O sol não vem, mas o foco precisa.',
        'generic'
      )
    );
  }

  if (signals.isPartlyCloudy || signals.isMostlyCloudy) {
    tips.push(
      createTip(
        'fallback-check-partly-cloudy-1',
        'Check rápido',
        signals.isNight
          ? 'Noite com nuvens alternando: luz extra ajuda. Sol não dá as caras, mas a segurança sim.'
          : 'Nuvens alternando: óculos escuros opcional. O sol aparece sem aviso prévio.',
        'generic'
      )
    );
  }

  if (tips.length === 0) {
    const message = signals.isFuture
      ? `Sensação de ${signals.feelsLike}°C. Olhou a previsão? Pronto, já ganhou bônus de organização.`
      : `Sensação de ${signals.feelsLike}°C agora. Ajuste a roupa e se hidrate; a previsão das próximas horas ajuda.`;
    tips.push(
      createTip(
        'fallback-check-generic-1',
        'Check rápido',
        message,
        'generic'
      )
    );
  }

  return tips;
};

/**
 * Seleciona dicas de pools ponderados, respeitando prioridades.
 */
const selectFromWeightedPools = (
  pools: TipPool[],
  maxCount: number
): WeatherTip[] => {
  const selected: WeatherTip[] = [];
  const usedIds = new Set<string>();
  const usedKinds = new Set<WeatherTipKind>();

  // Ordenar pools por peso (maior primeiro)
  const sortedPools = [...pools].sort((a, b) => b.weight - a.weight);

  for (const pool of sortedPools) {
    for (const tip of pool.tips) {
      if (selected.length >= maxCount) {
        return selected;
      }

      // Evitar duplicatas por ID
      if (usedIds.has(tip.id)) {
        continue;
      }

      // Evitar duplicatas semânticas (composite supersede individual metrics)
      if (tip.kind === 'composite') {
        // Composite tips são sempre adicionados
        selected.push(tip);
        usedIds.add(tip.id);
        usedKinds.add(tip.kind);
      } else if (!usedKinds.has('composite') ||
                 !['temperature', 'humidity', 'wind'].includes(tip.kind)) {
        // Adicionar se não for métrica já coberta por composite
        selected.push(tip);
        usedIds.add(tip.id);
        usedKinds.add(tip.kind);
      }
    }
  }

  return selected;
};

/**
 * Monta a lista final com 4 dicas, usando sistema de prioridades.
 */
export const buildWeatherTips = ({ snapshot, selectedDate }: WeatherTipsInput): WeatherTip[] => {
  const now = new Date();
  const isFuture = isFutureLocalDay(selectedDate, now);
  const seed = buildTipSeed(selectedDate, snapshot.description);

  // Pools de dicas por prioridade
  const alertPool: WeatherTip[] = [];
  const compositePool: WeatherTip[] = [];
  const primaryPool: WeatherTip[] = [];
  const positivePool: WeatherTip[] = [];
  const secondaryPool: WeatherTip[] = [];
  const fallbackPool: WeatherTip[] = [];

  // 1. Alertas (máxima prioridade)
  const alertTip = buildAlertTip(snapshot.alerts);
  if (alertTip) {
    alertPool.push(alertTip);
  }

  // 2. Condições compostas
  const miseryTip = buildMiseryTip(snapshot);
  if (miseryTip) compositePool.push(miseryTip);

  const windChillTip = buildWindChillTip(snapshot);
  if (windChillTip) compositePool.push(windChillTip);

  const badHairTip = buildBadHairDayTip(snapshot);
  if (badHairTip) compositePool.push(badHairTip);

  const deceptiveColdTip = buildDeceptiveColdTip(snapshot);
  if (deceptiveColdTip) compositePool.push(deceptiveColdTip);

  // 3. Dica principal (baseada na descrição do clima)
  const primaryTip = buildPrimaryTip(snapshot, selectedDate);
  primaryPool.push(primaryTip);

  // 4. Condições positivas
  const perfectDayTip = buildPerfectDayTip(snapshot, selectedDate);
  if (perfectDayTip) positivePool.push(perfectDayTip);

  const workoutTip = buildWorkoutTip(snapshot, selectedDate);
  if (workoutTip) positivePool.push(workoutTip);

  // 5. Dicas secundárias (existentes)
  const secondaryTips = buildSecondaryTips(snapshot, primaryTip.kind, selectedDate);
  const randomizedSecondary = shuffleTips(secondaryTips, seed);
  secondaryPool.push(...randomizedSecondary);

  // 6. Dicas coringa
  const fallbackTips = buildFallbackTips(snapshot, selectedDate);
  const randomizedFallback = shuffleTips(fallbackTips, seed + 7);
  fallbackPool.push(...randomizedFallback);

  // Montar pools com pesos
  const weightedPools: TipPool[] = [
    { tips: alertPool, weight: 10 },      // Alertas sempre primeiro
    { tips: compositePool, weight: 9 },   // Condições compostas (alta relevância)
    { tips: primaryPool, weight: 8 },     // Descrição principal do clima
    { tips: positivePool, weight: 7 },    // Clima perfeito (quando aplicável)
    { tips: secondaryPool, weight: 5 },   // Métricas individuais
    { tips: fallbackPool, weight: 1 },    // Coringa (último recurso)
  ];

  const selected = selectFromWeightedPools(weightedPools, 4);

  if (!isFuture) {
    return selected;
  }

  return selected.map((tip) => ({
    ...tip,
    message: formatFutureTipMessage(tip.message),
  }));
};
