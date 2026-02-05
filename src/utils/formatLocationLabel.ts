/**
 * Normaliza o estado brasileiro para sigla (ex.: Distrito Federal -> DF).
 */
const getBrazilStateAbbreviation = (stateName?: string): string | null => {
  if (!stateName) {
    return null;
  }

  const normalized = stateName.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const knownStates: Record<string, string> = {
    'distrito federal': 'DF',
    'federal district': 'DF',
    df: 'DF',
  };

  return knownStates[normalized] ?? null;
};

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

  if (cityName && countryCode === 'BR' && stateName) {
    const stateAbbreviation = getBrazilStateAbbreviation(stateName);
    if (stateAbbreviation) {
      return `${cityName} - ${stateAbbreviation}`;
    }
  }

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
