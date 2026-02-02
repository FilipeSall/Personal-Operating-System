# Fluxo do componente Weather

O Weather organiza a lógica e a visualização em camadas claras, o que facilita manter a separação entre serviços, estados e elementos visuais.

## Camadas principais
- **Weather**: container que usa o hook `useWeather` para fornecer `state`, `derived` e `actions` e abre o modal de detalhes.
- **WeatherView**: refaz o layout geral, exibe o status ou monta o painel superior (resumo + dica) e o rodapé de ações. A lógica de apresentação (como a label de data ou o `updatedAtLabel`) permanece aqui.
- **AGENTS deste fluxo**: atualize este arquivo sempre que o comportamento geral ou o fluxo de renderização mudar.

## Componentes UI
- **WeatherSummary**: resumo com emoji animado, temperatura, condição, tags contextuais e localização. Recebe `snapshot`, `description`, `dateLabel`, `temperatureValue` e `locationLabel` e delega o emoji e as informações para `WeatherSummaryEmoji.tsx` e `WeatherSummaryInfo.tsx`.
  - **WeatherSummaryEmoji**: exibe a data acima do emoji animado em um container flexível.
  - **WeatherSummaryInfo**: exibe temperatura, condição, tags contextuais e localização alinhados à esquerda.
  - **WeatherTagsRow**: renderiza tags de contexto do clima (sensação térmica, umidade, vento, etc.) com ícones emoji.
- **WeatherTipPanel**: painel principal de dicas, exibe 4 dicas com paginacao e icones relevantes para cada tipo. Dicas agora usam sistema de weighted pools com detectores de condições compostas (sufoco, vento cortante, etc.).
- **WeatherFooter**: agrupa o botão de atualizar e o botão de detalhes, reutilizando os estilos já existentes.

## Utilitários
- **getWeatherStatusMessage** (em `utils/`): centraliza a mensagem exibida quando o snapshot não está disponível ou quando há erro.
- **weatherTips** (em `utils/weatherTips/`): gera 4 dicas com tom profissional e contextual usando sistema de weighted pools. Detecta condições compostas (calor abafado, vento cortante, clima perfeito, etc.) com prioridades claras. Importe sempre de `./weatherTips/buildWeatherTips`.
- **weatherTags** (em `utils/`) - NOVO: gera até 3 tags de contexto do clima (sensação térmica, umidade extrema, vento significativo, UV alto, visibilidade reduzida). Prioriza sensação térmica sempre, depois extremos de umidade e vento.
- **weatherViewModel** (em `utils/`): integra dicas e tags no modelo de view.

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
- O `weatherPanel` usa grid em proporção `80/20` (conteúdo/rodapé) e respeita o slot do container (`height: 100%` com `maxHeight: 70vmin`), mantendo unidades em `em` para escalar com o viewport.
