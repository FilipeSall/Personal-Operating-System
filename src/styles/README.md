# StyleX Theme Documentation

## Estrutura do Tema

O tema foi criado usando `stylex.defineVars()` conforme a documentação oficial do StyleX.

## Fontes

O projeto utiliza duas fontes do Google Fonts:
- **Montserrat**: Para títulos, headings e botões (display)
- **Roboto**: Para texto corpo (body)

As fontes são importadas automaticamente no `index.html` via Google Fonts CDN.

### Arquivo: `theme.stylex.ts`

Este arquivo define todas as variáveis do tema extraídas da paleta de cores do código HTML original.

## Variáveis Disponíveis

### Cores (`colors`)

```typescript
import { colors } from './theme.stylex';

// Cores principais
colors.primary        // #D64550 - Accent principal (sidebar ativo)
colors.secondary      // #FA9500 - Accent secundário
colors.tertiary       // #A7AA29 - Accent terciário

// Sidebar
colors.sidebarBg      // #211A1E - Background da sidebar
colors.sidebarIcon    // #FDFFFC - Ícones da sidebar

// Backgrounds
colors.backgroundLight // #FDFFFC - Background modo claro
colors.backgroundDark  // #18181b - Background modo escuro

// Textos
colors.textMain       // #211A1E - Texto principal
colors.textLight      // #FDFFFC - Texto claro

// Cards
colors.cardLight      // #FFFFFF - Card modo claro
colors.cardDark       // #27272a - Card modo escuro
```

### Tipografia (`fonts`)

```typescript
import { fonts } from './theme.stylex';

fonts.display  // "Montserrat, sans-serif" - Para títulos e headings
fonts.body     // "Roboto, sans-serif" - Para texto corpo
```

### Border Radius (`borderRadius`)

```typescript
import { borderRadius } from './theme.stylex';

borderRadius.default  // "1rem"
borderRadius.soft     // "1rem"
```

### Sombras (`shadows`)

```typescript
import { shadows } from './theme.stylex';

shadows.soft   // "0 4px 20px rgba(0, 0, 0, 0.05)"
shadows.hover  // "0 10px 25px rgba(0, 0, 0, 0.1)"
```

## Como Usar

### 1. Importar as variáveis

```typescript
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, borderRadius, shadows } from "./theme.stylex";
```

### 2. Usar nas definições de estilos

```typescript
const styles = stylex.create({
  container: {
    backgroundColor: colors.backgroundLight,
    color: colors.textMain,
    fontFamily: fonts.body,
    borderRadius: borderRadius.default,
    boxShadow: shadows.soft,
  },

  containerDark: {
    backgroundColor: colors.backgroundDark,
    color: colors.textLight,
  },
});
```

### 3. Aplicar nos componentes

```typescript
function MyComponent() {
  return (
    <div {...stylex.props(styles.container)}>
      Content here
    </div>
  );
}
```

## Modo Escuro

Para implementar modo escuro, você pode usar a abordagem de classes condicionais do StyleX ou criar estilos separados que utilizam as variáveis dark correspondentes:

```typescript
const styles = stylex.create({
  container: {
    backgroundColor: colors.backgroundLight,
  },

  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
});

// No componente
<div {...stylex.props(styles.container, isDark && styles.containerDark)}>
```

## Referências

- [StyleX - Defining Variables](https://stylexjs.com/docs/learn/theming/defining-variables/)
- [StyleX - Using Variables](https://stylexjs.com/docs/learn/theming/using-variables/)
