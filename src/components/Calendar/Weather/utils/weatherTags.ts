import type { WeatherSnapshot } from '../../../../types/weather';

export type WeatherTag = {
  id: string;
  label: string;
  icon: string;
};

/**
 * Gera tags de sensação térmica baseado no "feels like".
 */
const buildThermalSensationTag = (feelsLike: number): WeatherTag | null => {
  if (feelsLike < 10) {
    return {
      id: 'thermal-gelado',
      label: 'Gelado',
      icon: '❄️',
    };
  }

  if (feelsLike < 15) {
    return {
      id: 'thermal-frio',
      label: 'Frio',
      icon: '🥶',
    };
  }

  if (feelsLike < 20) {
    return {
      id: 'thermal-fresco',
      label: 'Fresco',
      icon: '🌬️',
    };
  }

  if (feelsLike <= 25) {
    return {
      id: 'thermal-agradavel',
      label: 'Agradável',
      icon: '😊',
    };
  }

  if (feelsLike < 30) {
    return {
      id: 'thermal-quente',
      label: 'Quente',
      icon: '🌡️',
    };
  }

  return {
    id: 'thermal-muito-quente',
    label: 'Muito quente',
    icon: '🔥',
  };
};

/**
 * Gera tag de umidade baseado no percentual.
 */
const buildHumidityTag = (humidity: number): WeatherTag | null => {
  if (humidity < 30) {
    return {
      id: 'humidity-seco',
      label: 'Ar seco',
      icon: '💨',
    };
  }

  if (humidity <= 60) {
    return null; // Normal, não mostrar
  }

  if (humidity <= 75) {
    return {
      id: 'humidity-umido',
      label: 'Ar úmido',
      icon: '💧',
    };
  }

  return {
    id: 'humidity-abafado',
    label: 'Ar abafado',
    icon: '💦',
  };
};

/**
 * Gera tag de vento baseado na velocidade em km/h.
 */
const buildWindTag = (windKmh: number): WeatherTag | null => {
  if (windKmh < 5) {
    return null; // Calmaria, normal
  }

  if (windKmh < 15) {
    return {
      id: 'wind-brisa',
      label: 'Brisa leve',
      icon: '🍃',
    };
  }

  if (windKmh < 25) {
    return {
      id: 'wind-ventoso',
      label: 'Ventoso',
      icon: '💨',
    };
  }

  return {
    id: 'wind-muito-ventoso',
    label: 'Muito ventoso',
    icon: '🌪️',
  };
};

/**
 * Gera tag de UV se índice for alto.
 */
const buildUVTag = (uvIndex: number): WeatherTag | null => {
  if (uvIndex > 0 && uvIndex >= 6) {
    return {
      id: 'uv-alto',
      label: 'UV alto',
      icon: '☀️',
    };
  }

  return null;
};

/**
 * Gera tag de visibilidade reduzida para neblina/nevoeiro.
 */
const buildVisibilityTag = (description: string): WeatherTag | null => {
  const normalized = description
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

  if (normalized.includes('nevoa') || normalized.includes('neblina') ||
      normalized.includes('nevoeiro') || normalized.includes('mist') ||
      normalized.includes('fog')) {
    return {
      id: 'visibility-reduzida',
      label: 'Visibilidade reduzida',
      icon: '🌫️',
    };
  }

  return null;
};

/**
 * Gera lista de tags contextuais do clima.
 * Máximo de 3 tags, priorizando: sensação térmica > humidade extrema > vento > UV
 */
export const buildWeatherTags = (snapshot: WeatherSnapshot): WeatherTag[] => {
  const tags: WeatherTag[] = [];

  // 1. Sempre adiciona sensação térmica (mais importante)
  const thermalTag = buildThermalSensationTag(Math.round(snapshot.feelsLike));
  if (thermalTag) tags.push(thermalTag);

  // 2. Umidade extrema
  const humidityTag = buildHumidityTag(Math.round(snapshot.humidity));
  if (humidityTag && tags.length < 3) tags.push(humidityTag);

  // 3. Vento significativo
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const windTag = buildWindTag(windKmh);
  if (windTag && tags.length < 3) tags.push(windTag);

  // 4. UV alto
  if (tags.length < 3) {
    const uvTag = buildUVTag(snapshot.uvIndex);
    if (uvTag) tags.push(uvTag);
  }

  // 5. Visibilidade reduzida (se ainda houver espaço)
  if (tags.length < 3) {
    const visibilityTag = buildVisibilityTag(snapshot.description);
    if (visibilityTag) tags.push(visibilityTag);
  }

  return tags.slice(0, 3); // Limitar a 3 tags
};
