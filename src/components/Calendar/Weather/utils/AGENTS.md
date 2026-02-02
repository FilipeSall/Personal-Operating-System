# Fluxo de `utils` do Weather

Este diretório contém apenas helpers, calculadoras e builders que alimentam a camada de apresentação do Weather.

## Por que existe
- Mantém a lógica derivada (formatters, tip generators, view model helpers) separada da UI.
- Cada arquivo aqui deve ser puro, testável em isolamento e sem efeitos colaterais.
- A documentação rápida serve para qualquer agente evitar contexto duplicado e alinhar imports.

## Estrutura em destaque
- `weatherViewModel.ts` monta o modelo final que a view consome. Use as funções exportadas quando precisar reaproveitar formato ou ordem de campos.
- `weatherTips/` (subpasta): concentra toda a lógica de `buildWeatherTips`. Não há barrel — importe direto de `./weatherTips/buildWeatherTips`.
  - `buildWeatherTips.ts`: entrypoint que junta pools, embaralha dicas e aplica `formatFutureTipMessage`.
  - `builders/`: cada arquivo gera uma categoria (alerta, primária, composta, positiva, secundária, fallback).
  - `signals.ts`, `text.ts`, `metrics.ts`, `conditions.ts`, `formatters.ts`, `selectors.ts`, `seed.ts`, `tipUtils.ts` e `types.ts` são módulos pequenos com responsabilidades únicas e podem ser importados apenas pelo `buildWeatherTips` ou seus builders.

## Boas práticas
- Prefira importar de `../weatherTips/...` ou `./weatherTips/...` para evitar dependências globais.
- Atualize este AGENTS sempre que a estrutura de pastas ou a cadeia de responsabilidades mudar.
- Use comentários JSDoc em TypeScript para que o editor e os agentes capturem rapidamente a intenção.
