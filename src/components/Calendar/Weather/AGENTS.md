# Fluxo do componente Weather

O Weather organiza a lógica e a visualização em camadas claras, o que facilita manter a separação entre serviços, estados e elementos visuais.

## Camadas principais
- **Weather**: container que usa o hook `useWeather` para fornecer `state`, `derived` e `actions`, e consome o `useWeatherUiStore` para abrir/fechar o modal de detalhes.
- **WeatherView**: refaz o layout geral, exibe o status ou monta o painel superior (resumo + dica). A lógica de apresentação (como a label de data ou o `updatedAtLabel`) permanece aqui.
- **AGENTS deste fluxo**: atualize este arquivo sempre que o comportamento geral ou o fluxo de renderização mudar.

## Componentes UI
- **WeatherSummary**: resumo com emoji animado, temperatura, condição, tags contextuais e localização. Recebe `state`, `derived` e `actions` e delega o emoji e as informações para `WeatherSummaryEmoji.tsx` e `WeatherSummaryInfo.tsx`.
  - **WeatherSummaryEmoji**: exibe o botão de atualizar + horário acima do painel do emoji.
  - **WeatherSummaryInfo**: exibe temperatura, condição, tags contextuais e localização alinhados à esquerda.
  - **WeatherTagsRow**: renderiza tags de contexto do clima (sensação térmica, umidade, vento, etc.) com ícones emoji.
- **WeatherTipPanel**: painel principal de dicas, exibe 4 dicas com paginacao e icones relevantes para cada tipo. Dicas agora usam sistema de weighted pools com detectores de condições compostas (sufoco, vento cortante, etc.).
- **Botão de detalhes**: fica no rodapé das dicas, oposto aos botões de paginação.

## Utilitários
- **getWeatherStatusMessage** (em `utils/`): centraliza a mensagem exibida quando o snapshot não está disponível ou quando há erro.
- **weatherTips** (em `utils/weatherTips/`): gera 4 dicas com tom profissional e contextual usando sistema de weighted pools. Detecta condições compostas (calor abafado, vento cortante, clima perfeito, etc.) com prioridades claras. Importe sempre de `./weatherTips/buildWeatherTips`.
- **weatherTags** (em `utils/`) - gera 3 tags de contexto do clima (sensação térmica, umidade, vento, UV, visibilidade). Prioriza sensação térmica, depois umidade extrema, vento significativo e UV alto. Se faltar tag, preenche com versões neutras (ex.: Umidade ok, Calmaria).
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
- O `weatherPanel` usa grid para acomodar apenas o conteúdo principal (resumo + dicas), removendo o rodapé para evitar cortes.
- 02/02/2026: Ao substituir o snapshot do dia atual pelo dado em tempo real, agora herdamos a probabilidade de chuva agregada do forecast para evitar mostrar "Chance de chuva 0%" quando já há chuva leve.
