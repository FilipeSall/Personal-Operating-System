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
const buildPrimaryTip = (snapshot: WeatherSnapshot): WeatherTip => {
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
    return createTip(
      'primary-sun',
      'Dica do dia',
      `Com ${descriptionText}, a máxima chega a ${maxTemp}°C. Use protetor solar e mantenha-se bem hidratado.`,
      'sun'
    );
  }

  if (normalized.includes('nublado') || normalized.includes('nuvens') || normalized.includes('cloud')) {
    return createTip(
      'primary-clouds',
      'Dica do dia',
      `Com ${descriptionText} e ${clouds}% de nuvens, luz natural mais suave e temperatura estável.`,
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
const buildPerfectDayTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const pop = snapshot.pop;
  const clouds = Math.round(snapshot.clouds);

  if (!isPerfectDay(temp, humidity, windKmh, pop, clouds)) {
    return null;
  }

  return createTip(
    'perfect-day',
    'Clima ideal',
    `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Excelente dia para atividades ao ar livre.`,
    'positive'
  );
};

/**
 * Dica de clima perfeito para exercícios.
 */
const buildWorkoutTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const humidity = Math.round(snapshot.humidity);
  const uvIndex = snapshot.uvIndex;
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!isWorkoutWeather(temp, humidity, uvIndex, windKmh)) {
    return null;
  }

  return createTip(
    'workout-weather',
    'Clima de treino',
    `Condições ideais para exercícios ao ar livre: ${temp}°C e umidade controlada. Aproveite para se movimentar.`,
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
const buildSecondaryTips = (snapshot: WeatherSnapshot, primaryKind: WeatherTipKind): WeatherTip[] => {
  const tips: WeatherTip[] = [];
  const usedKinds = new Set<WeatherTipKind>([primaryKind]);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const humidity = Math.round(snapshot.humidity);
  const uvIndex = snapshot.uvIndex;
  const tempRange = Math.round(snapshot.temperature.max - snapshot.temperature.min);
  const precipitationTotal = snapshot.precipitation.rain + snapshot.precipitation.snow;
  const clouds = Math.round(snapshot.clouds);
  const popPercent = Math.round(snapshot.pop * 100);

  if (uvIndex >= 6) {
    pushUniqueTip(
      tips,
      createTip(
        'uv-high',
        'Proteção UV',
        `UV alto (${uvIndex.toFixed(1)}). Use protetor solar FPS 30+ e reaplique a cada 2 horas.`,
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
        `Acumulado de ${precipitationTotal.toFixed(1)} mm. Evite áreas com risco de alagamento.`,
        'precipitation'
      ),
      usedKinds
    );
  }

  if (clouds >= 70) {
    pushUniqueTip(
      tips,
      createTip(
        'clouds',
        'Céu fechado',
        `Nuvens em ${clouds}%. Luminosidade reduzida, considere iluminação adicional se necessário.`,
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
        `Chance de chuva ${popPercent}%. Leve guarda-chuva como precaução.`,
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
const buildFallbackTips = (snapshot: WeatherSnapshot): WeatherTip[] => {
  const tips: WeatherTip[] = [];
  const maxTemp = Math.round(snapshot.temperature.max);
  const minTemp = Math.round(snapshot.temperature.min);
  const feelsLike = Math.round(snapshot.feelsLike);

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

  tips.push(
    createTip(
      'fallback-routine',
      'Rotina',
      'Confira a previsão antes de sair. Pequenos preparativos evitam contratempos.',
      'generic'
    )
  );

  tips.push(
    createTip(
      'fallback-check',
      'Check rápido',
      'Verifique as condições climáticas antes de planejar o dia. Prevenir é melhor que remediar.',
      'generic'
    )
  );

  return tips;
};

/**
 * Tipo para pool de dicas com peso de prioridade.
 */
type TipPool = {
  tips: WeatherTip[];
  weight: number;
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
  const primaryTip = buildPrimaryTip(snapshot);
  primaryPool.push(primaryTip);

  // 4. Condições positivas
  const perfectDayTip = buildPerfectDayTip(snapshot);
  if (perfectDayTip) positivePool.push(perfectDayTip);

  const workoutTip = buildWorkoutTip(snapshot);
  if (workoutTip) positivePool.push(workoutTip);

  // 5. Dicas secundárias (existentes)
  const secondaryTips = buildSecondaryTips(snapshot, primaryTip.kind);
  const randomizedSecondary = shuffleTips(secondaryTips, seed);
  secondaryPool.push(...randomizedSecondary);

  // 6. Dicas coringa
  const fallbackTips = buildFallbackTips(snapshot);
  fallbackPool.push(...fallbackTips);

  // Montar pools com pesos
  const weightedPools: TipPool[] = [
    { tips: alertPool, weight: 10 },      // Alertas sempre primeiro
    { tips: compositePool, weight: 9 },   // Condições compostas (alta relevância)
    { tips: primaryPool, weight: 8 },     // Descrição principal do clima
    { tips: positivePool, weight: 7 },    // Clima perfeito (quando aplicável)
    { tips: secondaryPool, weight: 5 },   // Métricas individuais
    { tips: fallbackPool, weight: 1 },    // Coringa (último recurso)
  ];

  return selectFromWeightedPools(weightedPools, 4);
};
