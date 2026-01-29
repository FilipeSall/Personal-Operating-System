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
 * Usa uma abordagem pratica com toque comico.
 */
const getSummaryRecommendation = (description: string): string => {
  const normalized = normalizeText(description);

  // Tempestades (Grupo 2xx)
  if (normalized.includes('tempestade') || normalized.includes('trovoada')) {
    if (normalized.includes('forte') || normalized.includes('pesad') || normalized.includes('severa')) {
      return 'Tempestade braba! Adia aquela reunião presencial e aproveita pra maratonar série em casa.';
    }
    if (normalized.includes('garoa')) {
      return 'Trovoada com garoa. Despluga o PC, pega um livro e curte o barulho da chuva.';
    }
    return 'Trovoada no ar. Evita usar eletrônicos na tomada e aproveita pra ouvir aquele podcast.';
  }

  // Garoa (Grupo 3xx)
  if (normalized.includes('garoa') || normalized.includes('chuvisco')) {
    if (normalized.includes('forte')) {
      return 'Garoa insistente. Bom dia pra organizar as fotos do celular ou fazer aquele bolo.';
    }
    return 'Garoa de leve. Uma caminhada rápida com capa pode ser revigorante (ou não).';
  }

  // Chuva (Grupo 5xx)
  if (normalized.includes('chuva')) {
    if (normalized.includes('congel')) {
      return 'Chuva congelante! Risco de escorregão épico. Fica em casa e aproveita o aconchego.';
    }
    if (normalized.includes('forte') || normalized.includes('intensa') || normalized.includes('extrema')) {
      return 'Dilúvio detectado! Evita sair e faz um treino em casa ou maratona aquela playlist.';
    }
    return 'Chuva constante. Dia perfeito pra colocar a série em dia ou testar aquela receita nova.';
  }

  // Neve e Granizo (Grupo 6xx)
  if (normalized.includes('neve') || normalized.includes('granizo')) {
    if (normalized.includes('forte') || normalized.includes('pesad')) {
      return 'Nevasca forte! Fica quentinho em casa, evita dirigir e aproveita pra ler algo legal.';
    }
    return 'Neve à vista! Capricha no casaco e tira umas fotos da paisagem branca.';
  }

  // Atmosfera (Grupo 7xx)
  if (normalized.includes('nevoa') || normalized.includes('neblina') || normalized.includes('nevoeiro')) {
    return 'Visibilidade zero. Se dirigir, vai devagar. Atividade sugerida: meditação ou café quentinho.';
  }
  if (normalized.includes('fumaca') || normalized.includes('poeira') || normalized.includes('cinzas')) {
    return 'Ar ruim hoje. Fecha as janelas, liga o ar e hidrata bem. Nada de corridinha ao ar livre.';
  }
  if (normalized.includes('tornado') || normalized.includes('vento forte')) {
    return 'Ventos perigosos! Afasta de janelas e árvores. Busca abrigo seguro agora!';
  }

  // Céu Limpo (800)
  if (normalized.includes('ceu limpo') || normalized.includes('sol')) {
    return 'Dia ensolarado! Passa o protetor e aproveita pra fazer aquela atividade ao ar livre.';
  }

  // Nuvens (80x)
  if (normalized.includes('nublado') || normalized.includes('nuvens')) {
    if (normalized.includes('poucas') || normalized.includes('dispersas')) {
      return 'Clima agradável. Perfeito pra caminhar no parque ou fazer um piquenique improvisado.';
    }
    return 'Céu fechado mas sem chuva. Bom momento pra fotografia ou cuidar das plantas.';
  }

  return 'Clima tranquilo. Faz o que o coração mandar hoje!';
};

/**
 * Gera recomendacao baseada na temperatura.
 */
const getTemperatureRecommendation = (min: number, max: number): string => {
  if (max >= 30) {
    return 'Calorão! Bebe água feito camelo e evita sol entre 10h-16h. Roupas leves são a chave.';
  }
  if (min <= 12) {
    return 'Frio de rachar! Casaco, cachecol e aquele café quentinho são obrigatórios hoje.';
  }
  return 'Temperatura de boa. Dá pra sair sem drama de roupa.';
};

/**
 * Gera recomendacao baseada na sensacao termica.
 */
const getFeelsLikeRecommendation = (feelsLike: number): string => {
  if (feelsLike >= 30) {
    return 'Sensação de sauna! Cola na sombra, busca ventilador e adia qualquer exercício físico.';
  }
  if (feelsLike <= 12) {
    return 'Tá gelado! Capricha nas camadas de roupa tipo cebola. Seu corpo vai agradecer.';
  }
  return 'Sensação térmica de boa. Nem muito quente, nem muito frio.';
};

/**
 * Gera recomendacao baseada na chance de chuva.
 */
const getRainChanceRecommendation = (pop: number): string => {
  if (pop >= 0.6) {
    return 'Vai chover! Guarda-chuva no bolso ou prepare-se pra virar peixe na rua.';
  }
  if (pop >= 0.3) {
    return 'Talvez chova. Melhor levar uma capa de chuva, vai que né?';
  }
  return 'Chance baixa de chuva. Pode deixar o guarda-chuva em casa tranquilo.';
};

/**
 * Gera recomendacao baseada no vento.
 */
const getWindRecommendation = (speed: number): string => {
  const speedKmh = speed * 3.6;
  if (speedKmh >= 35) {
    return 'Ventania braba! Evita áreas abertas e prende tudo que pode voar. Chapéu? Nem pensar.';
  }
  if (speedKmh >= 20) {
    return 'Vento chatinho. Prende objetos leves e segura bem o cabelo (ou o que sobrou dele).';
  }
  return 'Ventinho gostoso. Dá até pra arejar a casa.';
};

/**
 * Gera recomendacao baseada na umidade.
 */
const getHumidityRecommendation = (humidity: number): string => {
  if (humidity >= 80) {
    return 'Úmido demais! Abre as janelas, liga o ventilador ou vira barata de praia mesmo.';
  }
  if (humidity <= 30) {
    return 'Ar seco! Bebe água, passa hidratante e considera um umidificador (ou toalha molhada).';
  }
  return 'Umidade tranquila. Tá respirável hoje.';
};

/**
 * Gera recomendacao baseada no indice UV.
 */
const getUvRecommendation = (uv: number): string => {
  if (uv >= 8) {
    return 'Sol assassino! Protetor FPS 50+, óculos escuros e evita sol das 10h-16h. É sério.';
  }
  if (uv >= 6) {
    return 'UV alto. Passa protetor, bota os óculos e busca sombra quando der.';
  }
  if (uv >= 3) {
    return 'UV moderado. Protetor básico já resolve, mas não esquece de reaplicar.';
  }
  return 'UV baixo. Proteção light já tá valendo, mas sempre é bom passar algo.';
};

/**
 * Gera recomendacao baseada na cobertura de nuvens.
 */
const getCloudsRecommendation = (clouds: number): string => {
  if (clouds >= 70) {
    return 'Céu cinzento total. Luz difusa perfeita pra trabalhar no PC sem reflexo na tela.';
  }
  if (clouds <= 20) {
    return 'Céu limpo! Abre as cortinas e aproveita a luz natural. Economia de energia garantida.';
  }
  return 'Céu com nuvens espalhadas. Clima agradável, nem muito sol nem muito sombrio.';
};

/**
 * Gera recomendacao baseada nos horarios de sol.
 */
const getSunTimesRecommendation = (): string => {
  return 'Aproveita a luz natural entre esses horários. Vitamina D de graça!';
};

/**
 * Gera recomendacao baseada em alertas meteorologicos.
 */
const getAlertsRecommendation = (alerts: string[]): string => {
  if (alerts.length > 0) {
    return 'Tem alerta rolando! Segue as orientações oficiais e não faz gracinha com a natureza.';
  }
  return 'Sem alertas. Tá tudo tranquilo no front meteorológico.';
};

/**
 * Gera recomendacao baseada na precipitacao.
 */
const getPrecipitationRecommendation = (rain: number, snow: number): string => {
  const total = rain + snow;
  if (total >= 5) {
    return 'Vai cair muita água! Guarda-chuva reforçado e evita áreas que alagam fácil.';
  }
  if (total > 0) {
    return 'Chuva leve prevista. Leva o guarda-chuva ou prepara pra molhar o cabelo.';
  }
  return 'Sem previsão de chuva. Pode deixar o guarda-chuva guardado mesmo.';
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
