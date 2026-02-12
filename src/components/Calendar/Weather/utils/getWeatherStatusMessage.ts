import type { WeatherDerived, WeatherState } from '../../hooks/useWeather';

export type WeatherStatusState = {
  kind: 'loading' | 'error' | 'past' | 'no-data';
  title: string;
  message: string;
  detail?: string;
};

type WeatherLoadingCopy = {
  title: string;
  message: string;
};

type WeatherNoForecastCopy = {
  title: string;
  message: string;
};

/**
 * Normaliza a data para o inicio do dia local.
 * @param date Data de referência.
 * @returns Data truncada para o início do dia local.
 */
const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Indica se a data alvo esta antes do dia atual.
 * @param target Data alvo.
 * @param now Data/hora atual.
 * @returns `true` quando a data alvo já passou.
 */
const isPastLocalDay = (target: Date, now: Date): boolean => {
  const today = getStartOfDay(now);
  const targetDay = getStartOfDay(target);
  return targetDay.getTime() < today.getTime();
};

/**
 * Indica se a data alvo esta depois do dia atual.
 * @param target Data alvo.
 * @param now Data/hora atual.
 * @returns `true` quando a data alvo é futura.
 */
const isFutureLocalDay = (target: Date, now: Date): boolean => {
  const today = getStartOfDay(now);
  const targetDay = getStartOfDay(target);
  return targetDay.getTime() > today.getTime();
};

/**
 * Seleciona um texto divertido de loading.
 * @returns Cópia aleatória para estado de loading.
 */
const getRandomLoadingCopy = (): WeatherLoadingCopy => {
  const options: WeatherLoadingCopy[] = [
    {
      title: 'Invocando nuvens...',
      message: 'Estamos consultando o oraculo do clima. Segura o guarda-chuva imaginario.',
    },
    {
      title: 'Carregando nuvens...',
      message: 'Conferindo se o sol vem mesmo ou so faz visita. Aguenta ai.',
    },
    {
      title: 'Chamando o clima...',
      message: 'Negociando com as nuvens e o vento. Volto ja com a previsao.',
    },
    {
      title: 'Temperando a previsao...',
      message: 'Misturando dados, vento e um toque de drama meteorologico.',
    },
  ];

  const index = Math.floor(Math.random() * options.length);
  return options[index] ?? options[0];
};

/**
 * Seleciona um texto amigável quando não existe previsão para o dia.
 * @returns Cópia aleatória para estado sem previsão.
 */
const getRandomNoForecastCopy = (): WeatherNoForecastCopy => {
  const options: WeatherNoForecastCopy[] = [
    {
      title: 'Sem previsão no radar',
      message: 'Essa data ainda não tem clima previsto. Tenta outro dia ou atualiza o painel.',
    },
    {
      title: 'Clima ainda não saiu',
      message: 'Parece cedo para essa data. A previsão chega mais perto do dia.',
    },
    {
      title: 'Sem dados por enquanto',
      message: 'Ainda não temos clima para esse dia. Dá uma olhada mais tarde.',
    },
    {
      title: 'Previsão em construção',
      message: 'Esse dia ainda está sem clima. Volta depois para ver as atualizações.',
    },
  ];

  const index = Math.floor(Math.random() * options.length);
  return options[index] ?? options[0];
};

/**
 * Retorna o status que deve ser exibido quando o resumo do clima não pode ser renderizado.
 * @param state Estado do hook de clima.
 * @param derived Dados derivados do hook de clima.
 * @returns Estado de status para UI ou `null` quando houver snapshot válido.
 */
export function getWeatherStatusState(
  state: WeatherState,
  derived: WeatherDerived
): WeatherStatusState | null {
  if (state.error) {
    return {
      kind: 'error',
      title: 'Clima deu tilt',
      message: 'A API escorregou na previsão. Tenta novamente em instantes.',
      detail: state.error,
    };
  }

  if (!derived.snapshot) {
    if (state.isLoading) {
      const loadingCopy = getRandomLoadingCopy();
      return {
        kind: 'loading',
        title: loadingCopy.title,
        message: loadingCopy.message,
      };
    }

    const now = new Date();

    if (isPastLocalDay(state.selectedDate, now)) {
      return {
        kind: 'past',
        title: 'Data no passado',
        message: 'Esse dia já foi e os meteorologistas também. Não temos previsão para datas antigas (nem DeLorean resolve).',
      };
    }

    if (isFutureLocalDay(state.selectedDate, now)) {
      const noForecastCopy = getRandomNoForecastCopy();
      return {
        kind: 'no-data',
        title: noForecastCopy.title,
        message: noForecastCopy.message,
      };
    }

    const noForecastCopy = getRandomNoForecastCopy();
    return {
      kind: 'error',
      title: noForecastCopy.title,
      message: noForecastCopy.message,
    };
  }

  return null;
}
