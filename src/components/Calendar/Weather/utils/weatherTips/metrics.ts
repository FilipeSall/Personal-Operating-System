/**
 * Calcula o indice de calor (heat index) combinando temperatura e umidade.
 * Retorna a sensacao termica real quando esta quente e umido.
 * @param temp Temperatura em °C.
 * @param humidity Umidade relativa em %.
 * @returns Índice de calor arredondado.
 */
export const calculateHeatIndex = (temp: number, humidity: number): number => {
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
 * Calcula a sensacao termica com vento frio (wind chill).
 * @param temp Temperatura em °C.
 * @param windKmh Velocidade do vento em km/h.
 * @returns Sensação térmica com efeito do vento.
 */
export const calculateWindChill = (temp: number, windKmh: number): number => {
  if (temp > 10 || windKmh < 4.8) return temp;

  const wc = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windKmh, 0.16) +
    0.3965 * temp * Math.pow(windKmh, 0.16);

  return Math.round(wc);
};
