# Padroes do fluxo Calendar

- O componente principal deve ficar na raiz: `src/components/Calendar/Calendar.tsx`.
- Subcomponentes ficam em pastas proprias (ex.: `CalendarGrid/`, `AddTodoModal/`, `CalendarDayCell/`).
- Separar logica (hooks) da UI (views).
- Utilitarios ficam em `src/components/Calendar/utils`.
- Constantes ficam em `src/components/Calendar/consts`.
- Hooks ficam em `src/components/Calendar/hooks`.
- Funcoes devem ter JSDoc em TypeScript.
- Funcoes com mais de 5 props devem separar tipos (ex.: `state`, `derived`, `actions`).
- Se uma alteracao impactar o fluxo do Calendar, atualizar este AGENTS.md.

## Weather (Clima)

### Arquitetura

- O componente de clima fica em `src/components/Calendar/Weather/` e usa o service em `src/services/openWeatherService.ts`.
- O store global de clima fica em `src/store/useWeatherStore.ts`.
- O agrupamento de forecast por dia fica em `src/utils/forecastGrouper.ts`.
- Tipos da API ficam em `src/types/openWeather.ts`, tipos internos em `src/types/weather.ts`.

### API OpenWeather (plano gratuito)

- O plano free so da acesso aos endpoints `data/2.5/forecast` e `data/2.5/weather`.
- O endpoint `data/3.0/onecall` exige plano pago e retorna 401 no plano free. Nao usar.
- `data/2.5/forecast`: previsao de 3h em 3h, ate 5 dias. Endpoint principal.
- `data/2.5/weather`: clima atual. Usado como fallback para o dia de hoje.
- `geo/1.0/reverse`: reverse geocoding para transformar lat/lon em cidade (label de localizacao).
- Campos indisponiveis no plano free: `uvIndex` (sempre 0), `alerts` (sempre []).
- A chave da API fica em `.env.local` como `VITE_OPENWEATHER_API_KEY`.

### Fluxo de dados

1. `useWeather` hook dispara `fetchWeather()` no mount.
2. O store faz duas chamadas em paralelo: `fetchForecast` + `fetchCurrentWeather`.
3. `groupForecastByDay()` agrupa os intervalos de 3h por dia (fuso local via `fromUnixTime`).
4. Se o dia de hoje nao existir no forecast (ex.: noite tarde), o clima atual e inserido como fallback.
5. O resultado e um `Map<string, WeatherSnapshot>` com chave `"YYYY-MM-DD"`.
6. `useWeather` le `selectedDate` do `useCalendarStore` e busca o snapshot correspondente.
7. Ao clicar em um dia no calendario, o Weather atualiza automaticamente.
8. Dias fora do range de 5 dias mostram "Previsao indisponivel para esta data."

### Cuidados

- Sempre agrupar forecast usando `fromUnixTime(item.dt)` com `format` local (nao usar `dt_txt` que e UTC).
- `toForecastKey(date)` e `groupItemsByDay` devem usar o mesmo fuso (local) para as chaves coincidirem.
- O hook `useWeather` deve assinar `store.forecasts` diretamente (nao `getSnapshotForDate`) para garantir reatividade com Zustand.
- Logs de debug usam `debugLog`/`debugError`/`debugWarn` de `src/utils/logger.ts` (so aparecem em DEV).
- O label de localizacao para `BR` prioriza `Cidade - UF` (ex.: `Plano Piloto - DF`).
