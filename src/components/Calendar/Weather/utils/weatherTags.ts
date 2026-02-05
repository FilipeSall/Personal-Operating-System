import type { WeatherSnapshot } from '../../../../types/weather';

export type WeatherTag = {
  id: string;
  label: string;
  icon: string;
};

type HumidityTagMode = 'extremes' | 'always';
type WindTagMode = 'significant' | 'always';
type UVTagMode = 'high' | 'always';

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
 * @param humidity Umidade em percentual (0-100).
 * @param mode "extremes" retorna apenas extremos; "always" inclui neutral.
 */
const buildHumidityTag = (humidity: number, mode: HumidityTagMode): WeatherTag | null => {
  if (humidity < 30) {
    return {
      id: 'humidity-seco',
      label: 'Ar seco',
      icon: '💨',
    };
  }

  if (humidity <= 59) {
    if (mode === 'always') {
      return {
        id: 'humidity-ok',
        label: 'Umidade ok',
        icon: '💧',
      };
    }
    return null;
  }

  if (humidity <= 74) {
    if (mode === 'always') {
      return {
        id: 'humidity-umido',
        label: 'Ar úmido',
        icon: '💧',
      };
    }
    return null;
  }

  return {
    id: 'humidity-abafado',
    label: 'Ar abafado',
    icon: '💦',
  };
};

/**
 * Gera tag de vento baseado na velocidade em km/h.
 * @param windKmh Velocidade do vento em km/h.
 * @param mode "significant" exibe apenas vento relevante; "always" inclui calmaria/brisa.
 */
const buildWindTag = (windKmh: number, mode: WindTagMode): WeatherTag | null => {
  if (windKmh < 5) {
    if (mode === 'always') {
      return {
        id: 'wind-calmaria',
        label: 'Calmaria',
        icon: '🌾',
      };
    }
    return null;
  }

  if (windKmh < 15) {
    if (mode === 'always') {
      return {
        id: 'wind-brisa',
        label: 'Brisa leve',
        icon: '🍃',
      };
    }
    return null;
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
 * @param uvIndex Índice UV (0-11+).
 * @param mode "high" retorna apenas UV alto; "always" inclui níveis baixos/moderados.
 */
const buildUVTag = (uvIndex: number, mode: UVTagMode): WeatherTag | null => {
  if (uvIndex > 0 && uvIndex >= 6) {
    return {
      id: 'uv-alto',
      label: 'UV alto',
      icon: '☀️',
    };
  }

  if (mode === 'always' && uvIndex > 0) {
    if (uvIndex >= 3) {
      return {
        id: 'uv-moderado',
        label: 'UV moderado',
        icon: '😎',
      };
    }

    return {
      id: 'uv-baixo',
      label: 'UV baixo',
      icon: '🧴',
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
 * Sempre retorna 3 tags quando possível.
 * Prioridade: sensação térmica > umidade extrema > vento significativo > UV alto > visibilidade.
 * Preenchimento: umidade/wind em modo neutro e UV opcional.
 */
export const buildWeatherTags = (snapshot: WeatherSnapshot): WeatherTag[] => {
  const tags: WeatherTag[] = [];

  /**
   * Adiciona a tag se ainda houver espaço e ela não estiver duplicada.
   */
  const pushTag = (tag: WeatherTag | null): void => {
    if (!tag || tags.length >= 3) {
      return;
    }

    if (tags.some((existing) => existing.id === tag.id)) {
      return;
    }

    tags.push(tag);
  };

  // 1. Sempre adiciona sensação térmica (mais importante).
  const thermalTag = buildThermalSensationTag(Math.round(snapshot.feelsLike));
  pushTag(thermalTag);

  // 2. Umidade extrema.
  const humidityValue = Math.round(snapshot.humidity);
  pushTag(buildHumidityTag(humidityValue, 'extremes'));

  // 3. Vento significativo.
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  pushTag(buildWindTag(windKmh, 'significant'));

  // 4. UV alto.
  pushTag(buildUVTag(snapshot.uvIndex, 'high'));

  // 5. Visibilidade reduzida.
  pushTag(buildVisibilityTag(snapshot.description));

  // 6. Preenchimento neutro para garantir 3 tags.
  if (tags.length < 3) {
    pushTag(buildHumidityTag(humidityValue, 'always'));
  }

  if (tags.length < 3) {
    pushTag(buildWindTag(windKmh, 'always'));
  }

  if (tags.length < 3) {
    pushTag(buildUVTag(snapshot.uvIndex, 'always'));
  }

  return tags.slice(0, 3); // Limitar a 3 tags
};
