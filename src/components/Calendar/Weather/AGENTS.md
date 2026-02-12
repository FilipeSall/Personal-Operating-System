# Fluxo do componente Weather

O Weather organiza a lógica e a visualização em camadas claras, o que facilita manter a separação entre serviços, estados e elementos visuais.

## Camadas principais
- **Weather**: container que usa o hook `useWeather` para fornecer `state`, `derived` e `actions`, e consome o `useWeatherUiStore` para abrir/fechar o modal de detalhes.
- **WeatherView**: refaz o layout geral, exibe o status ou monta o painel superior (resumo + dica). A lógica de apresentação (como a label de data ou o `updatedAtLabel`) permanece aqui.
- **WeatherDetailsModal**: usa arquitetura em 4 camadas para o modal de detalhes:
  - `WeatherDetailsModalView.tsx` como UI declarativa.
  - `WeatherDetailsModal.logic.ts` para interações (ex.: clique no overlay).
  - `services/weatherDetailsModalService.ts` para montar o view model dos cards.
  - `utils/weatherDetailsModalParsers.ts` para parsing/formatadores puros.
  - tipos compartilhados em `src/components/Calendar/types/weatherDetailsModal.ts`.
  - constantes visuais (`WEATHER_ICON_MAP`, `WEATHER_GRADIENT_MAP`) em `src/components/Calendar/consts/weatherDetailsModal.ts`.
- **AGENTS deste fluxo**: atualize este arquivo sempre que o comportamento geral ou o fluxo de renderização mudar.

## Componentes UI
- **WeatherSummary**: resumo com emoji animado, temperatura, condição, tags contextuais e localização. Recebe `state`, `derived` e `actions` e delega o emoji e as informações para `WeatherSummaryEmoji.tsx` e `WeatherSummaryInfo.tsx`.
  - **WeatherSummaryEmoji**: exibe o botão de atualizar + horário acima do painel do emoji.
  - **WeatherSummaryInfo**: exibe temperatura, condição, tags contextuais e localização alinhados à esquerda.
  - **WeatherTagsRow**: renderiza tags de contexto do clima (sensação térmica, umidade, vento, etc.) com ícones emoji.
- **WeatherTipPanel**: painel principal de dicas, exibe 4 dicas com paginacao e icones relevantes para cada tipo. Dicas agora usam sistema de weighted pools com detectores de condições compostas (sufoco, vento cortante, etc.).
- **Botão de detalhes**: fica no rodapé das dicas, oposto aos botões de paginação.
- **WeatherDetailsModalCard**: componente visual dedicado para renderizar cada card tipado do modal, sem lógica de transformação.

## Utilitários
- **getWeatherStatusMessage** (em `utils/`): centraliza a mensagem exibida quando o snapshot não está disponível ou quando há erro.
- **weatherTips** (em `utils/weatherTips/`): gera 4 dicas com tom profissional e contextual usando sistema de weighted pools. Detecta condições compostas (calor abafado, vento cortante, clima perfeito, etc.) com prioridades claras. Importe sempre de `./weatherTips/buildWeatherTips`.
- **weatherTags** (em `utils/`) - gera 3 tags de contexto do clima (sensação térmica, umidade, vento, UV, visibilidade). Prioriza sensação térmica, depois umidade extrema, vento significativo e UV alto. Se faltar tag, preenche com versões neutras (ex.: Umidade ok, Calmaria).
- **weatherViewModel** (em `utils/`): integra dicas e tags no modelo de view.
- **formatWeatherDetailsRecommendation** (em `utils/`): adapta recomendações do modal para datas futuras, evitando texto no presente.

## Hourly precipitation timeline (Open-Meteo)

- **Service**: `src/services/openMeteoService.ts` (`fetchHourlyForecast`) para dados horarios.
- **Mapper**: `src/utils/hourlyForecastMapper.ts` converte `OpenMeteoHourlyResponse` em `HourlyForecast`.
- **Cache key**: `${lat.toFixed(2)}|${lon.toFixed(2)}|YYYY-MM-DD|source` via `buildHourlyCacheKey`.
- **Datas passadas**: usam Open-Meteo Archive (`source = archive`) quando a data selecionada e menor que hoje.
- **Fallback**: se o Archive falhar, o hook tenta o Forecast para a mesma data.
- **Persistencia**: `hourlyForecasts` ficam em `localStorage` (key `personal-os:weather-hourly-cache:v1`) com TTL do cache.
- **Store**: `src/store/useWeatherStore.ts` guarda `hourlyForecasts` e `hourlyStatus` por chave, com TTL de 30min e limite de 20 entradas (remove a mais antiga).
- **Hook**: `src/components/Calendar/hooks/useHourlyForecast.ts` aplica debounce (300ms), valida range D-1 ate D+15 e cancela com `AbortController`.
- **UI**: `CalendarSidebarTimelineRow` renderiza icone de clima + % de chuva ao lado do horario; `buildHourlyTimeline` injeta `precipProbability` e `weatherCode`.
- **Evitar excesso**: nao refazer request se o cache estiver valido e sempre cancelar a requisicao anterior ao trocar de dia rapidamente.

## Sistema de Dicas Inteligentes (v2)

### Arquitetura
As dicas agora usam um sistema de **weighted pools** que prioriza automaticamente baseado na relevância:

1. **Alertas** (peso 10) - Sempre mostrados em primeiro lugar se existirem
2. **Condições Compostas** (peso 9) - Combinações inteligentes (ex: calor + umidade = "sufoco")
3. **Dica Principal** (peso 8) - Baseada na descrição do clima
4. **Clima Perfeito** (peso 7) - Reconhece e celebra dias ideais
5. **Métricas Individuais** (peso 5) - UV, umidade, vento, precipitação
6. **Coringa** (peso 1) - Fallbacks genéricas

### Tipos de Dicas Implementadas
- **Primary tips**: tempestade, chuva, neve, neblina, vento, sol, nublado, genérica
- **Composite tips**: sufoco (calor+umidade+vento baixo), vento cortante (frio+vento forte), cabelo rebelde (umidade+vento+chuva), frio enganador (temp ok mas sensação fria com nuvens)
- **Positive tips**: clima ideal para atividades ao ar livre, clima de treino
- **Secondary tips**: UV alto, vento forte, umidade alta/baixa, amplitude térmica, chuva acumulada, céu fechado, chance de chuva
- **Fallback tips**: calor extremo, frio extremo, equilíbrio, rotina, check rápido

## Observações
- Data agora aparece acima do emoji animado em `WeatherSummaryEmoji`
- Todos os textos foram reescritos com tom profissional e amigável (sem gírias excessivas)
- Tags dinâmicas adicionadas ao `WeatherSummaryInfo` para maior contexto visual
- Itens de dica (`weatherTipItem`) agora usam `flex: 1` para ocupar altura igual
- Breakpoint `bp1440` adicionado para aumentar fontes em telas largas (> 1440px)
- Estilos consolidados em `CSS/` folder, sem style inline (Panda CSS)
- O `weatherPanel` usa grid para acomodar apenas o conteúdo principal (resumo + dicas), removendo o rodapé para evitar cortes.
- 02/02/2026: Ao substituir o snapshot do dia atual pelo dado em tempo real, agora herdamos a probabilidade de chuva agregada do forecast para evitar mostrar "Chance de chuva 0%" quando já há chuva leve.
- 05/02/2026: Dica de umidade alta agora considera sensação/índice de calor antes de recomendar evitar atividade intensa; em temperaturas amenas usa mensagem neutra.
- 05/02/2026: Dicas principais e recomendações da tabela agora cruzam fatores (UV, calor, vento, chuva, nuvens) para evitar mensagens incoerentes com o contexto.
- 05/02/2026: Chance de chuva agora considera precipitação atual (ex.: "Chuva agora") e o POP é corrigido quando o clima atual vem com chuva/neve.
- 05/02/2026: Quando o hourly do Open-Meteo termina, o POP do dia atual pode ser ajustado pela probabilidade da hora atual (se não estiver chovendo agora).
- 12/02/2026: `WeatherDetailsModalView` foi refatorado para separar `logic`, `service`, `utils` e `UI`, removendo parsing/transformação da camada de renderização.
- 12/02/2026: Tipos do modal de detalhes migrados para `src/components/Calendar/types/weatherDetailsModal.ts`; funções utilitárias do Weather passaram a documentar `@param`/`@returns` no JSDoc.
- 12/02/2026: `WEATHER_ICON_MAP` e `WEATHER_GRADIENT_MAP` foram movidos para `src/components/Calendar/consts/weatherDetailsModal.ts`.
- 12/02/2026: Recomendações do `WeatherDetailsModal` agora trocam para tom de previsão quando a data selecionada é futura (sem frases como "agora/hoje").
