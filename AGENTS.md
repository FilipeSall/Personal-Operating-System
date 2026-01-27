# Padrões do projeto

Este projeto segue os padrões abaixo:

- Separar sempre a lógica de serviços e a UI (componentes de view).
- Centralizar funções utilitárias na pasta `utils`.
- Todas as funções devem ter JSDoc em TypeScript.
- Funções com mais de 5 props/parâmetros devem separar tipos (ex.: `state`, `derived`, `actions` em hooks).
- Cada alteração feita, se impactar no fluxo, alterar o AGENTS.md daquele fluxo.

## Tecnologias usadas
- React 19
- TypeScript 5
- Vite
- Zustand
- Panda CSS (styled-system)
- date-fns
- react-icons
- react-router-dom
- Firebase
