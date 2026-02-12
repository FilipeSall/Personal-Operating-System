/**
 * Detecta condicao de "sufoco" (muito calor + muita umidade + sem vento).
 * @param temp Temperatura em °C.
 * @param humidity Umidade relativa em %.
 * @param windKmh Velocidade do vento em km/h.
 * @returns `true` quando há sensação de abafamento.
 */
export const isMiserable = (temp: number, humidity: number, windKmh: number): boolean => {
  return temp >= 28 && humidity >= 70 && windKmh <= 10;
};

/**
 * Detecta "vento cortante" (frio + vento forte).
 * @param temp Temperatura em °C.
 * @param windKmh Velocidade do vento em km/h.
 * @returns `true` quando a condição de vento cortante é atendida.
 */
export const hasWindChill = (temp: number, windKmh: number): boolean => {
  return temp <= 10 && windKmh >= 20;
};

/**
 * Detecta "dia do cabelo rebelde" (umidade + vento + chuva).
 * @param humidity Umidade relativa em %.
 * @param windKmh Velocidade do vento em km/h.
 * @param pop Probabilidade de precipitação (0-1).
 * @returns `true` quando a combinação favorece frizz.
 */
export const isBadHairDay = (humidity: number, windKmh: number, pop: number): boolean => {
  return humidity >= 70 && windKmh >= 15 && pop >= 0.3;
};

/**
 * Detecta clima perfeito para atividades ao ar livre.
 * @param temp Temperatura em °C.
 * @param humidity Umidade relativa em %.
 * @param windKmh Velocidade do vento em km/h.
 * @param pop Probabilidade de precipitação (0-1).
 * @param clouds Cobertura de nuvens em %.
 * @returns `true` quando as condições estão dentro da faixa ideal.
 */
export const isPerfectDay = (
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
 * Detecta condicoes ideais para exercicios ao ar livre.
 * @param temp Temperatura em °C.
 * @param humidity Umidade relativa em %.
 * @param uvIndex Índice UV.
 * @param windKmh Velocidade do vento em km/h.
 * @returns `true` quando o clima é adequado para treino externo.
 */
export const isWorkoutWeather = (
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
 * Detecta frio enganador (temperatura ok mas sensacao fria).
 * @param temp Temperatura atual em °C.
 * @param clouds Cobertura de nuvens em %.
 * @param windKmh Velocidade do vento em km/h.
 * @returns `true` quando a sensação tende a ficar mais fria que o esperado.
 */
export const isDeceptivelyCold = (temp: number, clouds: number, windKmh: number): boolean => {
  return temp >= 15 && temp <= 22 && clouds >= 60 && windKmh >= 15;
};
