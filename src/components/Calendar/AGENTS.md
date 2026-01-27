# Padrões do fluxo Calendar

- O componente principal deve ficar na raiz: `src/components/Calendar/Calendar.tsx`.
- Subcomponentes ficam em pastas próprias (ex.: `CalendarGrid/`, `AddTodoModal/`, `CalendarDayCell/`).
- Separar lógica (hooks) da UI (views).
- Utilitários ficam em `src/components/Calendar/utils`.
- Constantes ficam em `src/components/Calendar/consts`.
- Hooks ficam em `src/components/Calendar/hooks`.
- Funções devem ter JSDoc em TypeScript.
- Funções com mais de 5 props devem separar tipos (ex.: `state`, `derived`, `actions`).
- Se uma alteração impactar o fluxo do Calendar, atualizar este AGENTS.md.
