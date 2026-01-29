/**
 * Formata o label de localizacao a partir de cidade e pais.
 */
export const formatLocationLabel = (params: {
  cityName?: string;
  stateName?: string;
  countryCode?: string;
  fallback: string;
}): string => {
  const { cityName, stateName, countryCode, fallback } = params;

  if (cityName && countryCode) {
    return `${cityName}, ${countryCode}`;
  }

  if (cityName && stateName) {
    return `${cityName}, ${stateName}`;
  }

  if (cityName) {
    return cityName;
  }

  return fallback;
};
