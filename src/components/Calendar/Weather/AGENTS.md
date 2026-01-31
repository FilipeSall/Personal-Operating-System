# Fluxo do componente Weather

O Weather organiza a lógica e a visualização em camadas claras, o que facilita manter a separação entre serviços, estados e elementos visuais.

## Camadas principais
- **Weather**: container que usa o hook `useWeather` para fornecer `state`, `derived` e `actions` e abre o modal de detalhes.
- **WeatherView**: refaz o layout geral, exibe o status ou monta o painel superior (resumo + dica) e o rodapé de ações. A lógica de apresentação (como a label de data ou o `updatedAtLabel`) permanece aqui.
- **AGENTS deste fluxo**: atualize este arquivo sempre que o comportamento geral ou o fluxo de renderização mudar.

## Componentes UI
- **WeatherSummary**: resumo com emoji animado, temperatura, condição e localização. Recebe `snapshot`, `description`, `dateLabel`, `temperatureValue` e `locationLabel`.
- **WeatherMetricsPanel**: agrupa o grid de métricas (umidade, vento, UV) e o `WeatherTipPanel`.
- **WeatherTipPanel**: encapsula o cartão "Dica do dia" e a responsividade lateral.
- **WeatherFooter**: agrupa o botão de atualizar e o botão de detalhes, reutilizando os estilos já existentes.

## Utilitários
- **getWeatherStatusMessage** (em `utils/`): centraliza a mensagem exibida quando o snapshot não está disponível ou quando há erro.

## Observações
- Mantivemos `resolveWeatherEmoji` e os hooks externos sem alterações; os estilos agora ficam separados na pasta `styles/` por componente.
- O `weatherPanel` usa grid em proporção `70/30` (conteúdo/rodapé) e respeita o slot do container (`height: 100%` com `maxHeight: 70vmin`), mantendo unidades em `em` para escalar com o viewport.
