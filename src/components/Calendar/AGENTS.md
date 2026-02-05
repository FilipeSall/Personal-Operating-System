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
- Ao clicar em um dia fora do mes atual, o calendario deve mudar para o mes daquele dia e selecionar a data.
- O layout principal do calendario organiza um painel lateral fixo (`CalendarSidebar`) e a area principal (grid + clima).
- O botão "Detalhes do clima" fica no painel de dicas do clima e abre o modal via `useWeatherUiStore`.

## Painel lateral (CalendarSidebar)

- Container: `src/components/Calendar/CalendarSidebar/CalendarSidebar.tsx`.
- View: `src/components/Calendar/CalendarSidebar/CalendarSidebarView.tsx`.
- Hook: `src/components/Calendar/hooks/useCalendarSidebar.ts`.
- Helpers: `src/components/Calendar/utils/calendarSidebar.ts`.
- Responsavel por timeline de 24h e tarefas do dia (eventos especiais temporariamente desativados na UI).
- A timeline nao usa scroll; a navegacao e feita por controles (setas + jump) em janelas fixas de horas.
- A janela padrao exibe 8 horas por vez e inicia na hora atual quando disponivel.
- Tarefas por hora podem ser expandidas/recolhidas localmente dentro do bloco.
- Quando a janela excede o fim do dia, as horas restantes sao exibidas como proximo dia.
- Ao selecionar uma hora do proximo dia, o calendario avanca a data selecionada.
- A timeline agora injeta probabilidade de chuva e codigo WMO por hora (Open-Meteo) para mostrar icone + % ao lado do horario.

### Hourly precipitation timeline

- Service: `src/services/openMeteoService.ts` (`fetchHourlyForecast`).
- Mapper: `src/utils/hourlyForecastMapper.ts` (`mapOpenMeteoToHourly`, `buildHourlyCacheKey`).
- Store: `src/store/useWeatherStore.ts` (`hourlyForecasts`, `hourlyStatus` por chave, TTL 30min, max 20 entradas).
- Hook: `src/components/Calendar/hooks/useHourlyForecast.ts` (debounce 300ms, AbortController, range D-1 ate D+15).
- UI: `CalendarSidebarTimelineRow` consome `precipProbability` e `weatherCode` dos slots montados por `buildHourlyTimeline`. Quando `isHourlyLoading` estiver ativo, todos os slots exibem spinner.
- O cabeçalho da Agenda do dia mostra apenas o dia da semana, sem dia do mês nem mês.
- O rótulo da Agenda do dia capitaliza a primeira letra do dia (`Segunda`, `Terça`, etc.).
- Cache key: `${lat.toFixed(2)}|${lon.toFixed(2)}|YYYY-MM-DD|source` (source = `forecast` ou `archive`).
- Datas passadas usam o endpoint archive da Open-Meteo (limitado pelo range do hook).
- Se o archive falhar, o hook tenta fallback com o endpoint forecast para a mesma data.
- O cache hourly e persistido no `localStorage` (key `personal-os:weather-hourly-cache:v1`) e respeita TTL.
- Evitar spam: nao refazer requests quando cache estiver fresco, usar debounce e cancelar chamadas anteriores.

## Weather (Clima)

### Arquitetura

- O componente de clima fica em `src/components/Calendar/Weather/` e usa o service em `src/services/openWeatherService.ts`.
- O store global de clima fica em `src/store/useWeatherStore.ts`.
- O agrupamento de forecast por dia fica em `src/utils/forecastGrouper.ts`.
- Tipos da API ficam em `src/types/openWeather.ts`, tipos internos em `src/types/weather.ts`.
- O emoji principal do clima usa Lottie com assets em `src/assets/emojis`, mapeados em `src/components/Calendar/utils/weatherEmoji.ts`.
- O botao "Ver detalhes" do clima abre um modal com a tabela completa em `src/components/Calendar/Weather/WeatherDetailsModalView.tsx`.
- O painel superior combina `WeatherSummary` com `WeatherTipPanel`, que exibe 4 dicas paginadas e prioriza alertas em segundo quando existirem.

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
4. O dia de hoje e sempre substituido pelo clima atual para garantir que a temperatura exibida reflita o momento presente, mesmo que o forecast ja contenha intervalos para hoje.
5. O resultado e um `Map<string, WeatherSnapshot>` com chave `"YYYY-MM-DD"`.
6. `useWeather` le `selectedDate` do `useCalendarStore` e busca o snapshot correspondente.
7. Ao clicar em um dia no calendario, o Weather atualiza automaticamente.
8. Dias fora do range de 5 dias mostram "Previsao indisponivel para esta data."

### Cuidados

- Sempre agrupar forecast usando `fromUnixTime(item.dt)` com `format` local (nao usar `dt_txt` que e UTC).
- `toForecastKey(date)` e `groupItemsByDay` devem usar o mesmo fuso (local) para as chaves coincidirem.
- O hook `useWeather` deve assinar `store.forecasts` diretamente (nao `getSnapshotForDate`) para garantir reatividade com Zustand.
- O label de localizacao para `BR` prioriza `Cidade - UF` (ex.: `Plano Piloto - DF`).
- Dicas do tipo "Check rápido" que falam em "luz extra" ou nuvens densas só entram quando a cobertura estiver em pelo menos 75%, evitando mensagens fora de contexto.
- Quando o usuário escolhe uma data passada sem snapshot, exibimos um card de status que avisa (com humor) que o dia já passou e usamos o Lottie `time.json`.
- Quando o usuário escolhe uma data futura sem snapshot, exibimos o Lottie `wait.json`. Erros reais de API continuam usando `alert.json`.
