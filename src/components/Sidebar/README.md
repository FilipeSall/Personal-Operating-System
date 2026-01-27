# Sidebar Component

Componente de navegação lateral totalmente componentizado com estilos StyleX separados para fácil manutenção.

## Estrutura de Arquivos

```
Sidebar/
├── styles/
│   ├── sidebar.stylex.ts           # Estilos do container principal
│   ├── sidebarLogo.stylex.ts       # Estilos do logo
│   ├── sidebarNav.stylex.ts        # Estilos da navegação
│   ├── sidebarNavItem.stylex.ts    # Estilos dos itens de navegação
│   └── sidebarFooter.stylex.ts     # Estilos do rodapé
├── Sidebar.tsx                      # Componente principal
├── SidebarLogo.tsx                  # Componente do logo
├── SidebarNav.tsx                   # Componente de navegação
├── SidebarNavItem.tsx               # Componente de item individual
├── SidebarFooter.tsx                # Componente de rodapé
├── Sidebar.example.tsx              # Exemplo de uso
├── index.ts                         # Exports públicos
└── README.md                        # Documentação
```

## Componentes

### Sidebar (Principal)

Componente wrapper que agrupa todos os subcomponentes.

**Props:**
- `logoIcon?: string` - Ícone do Material Icons para o logo (padrão: 'dashboard')
- `navItems: NavItem[]` - Array de itens de navegação
- `onNavItemClick?: (item: NavItem) => void` - Callback ao clicar em um item
- `onLogout?: () => void` - Callback ao clicar no botão de logout

### SidebarLogo

Exibe o logo/ícone no topo da sidebar.

**Props:**
- `icon?: string` - Nome do ícone Material Icons (padrão: 'dashboard')

### SidebarNav

Container para os itens de navegação.

**Props:**
- `items: NavItem[]` - Array de itens de navegação
- `onItemClick?: (item: NavItem) => void` - Callback ao clicar em um item

### SidebarNavItem

Item individual de navegação com tooltip.

**Props:**
- `icon: string` - Ícone Material Icons
- `label: string` - Texto do tooltip
- `href: string` - URL de destino
- `isActive?: boolean` - Se o item está ativo
- `onClick?: () => void` - Callback ao clicar

### SidebarFooter

Rodapé com botão de logout.

**Props:**
- `onLogout?: () => void` - Callback ao clicar no botão de logout

## Tipo NavItem

```typescript
interface NavItem {
  icon: string;        // Nome do ícone Material Icons
  label: string;       // Texto exibido no tooltip
  href: string;        // URL de destino
  isActive?: boolean;  // Define se o item está ativo
}
```

## Exemplo de Uso

```tsx
import { Sidebar, NavItem } from '@/components/Sidebar';

const App = () => {
  const navItems: NavItem[] = [
    {
      icon: 'home',
      label: 'Home',
      href: '/',
      isActive: true
    },
    {
      icon: 'check_circle',
      label: 'Tarefas & Agenda',
      href: '/tarefas',
    },
    {
      icon: 'account_balance_wallet',
      label: 'Finanças',
      href: '/financas',
    },
  ];

  const handleNavClick = (item: NavItem) => {
    console.log('Navegando para:', item.label);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <Sidebar
      logoIcon="dashboard"
      navItems={navItems}
      onNavItemClick={handleNavClick}
      onLogout={handleLogout}
    />
  );
};
```

## Estilos

Todos os estilos estão em arquivos StyleX separados na pasta `styles/`:

- **sidebar.stylex.ts**: Container principal com posicionamento fixo, cores e espaçamento
- **sidebarLogo.stylex.ts**: Logo com gradiente e sombra
- **sidebarNav.stylex.ts**: Container de navegação com flexbox
- **sidebarNavItem.stylex.ts**: Itens com estados hover, active e tooltip
- **sidebarFooter.stylex.ts**: Botão de logout com efeitos hover

## Cores do Tema

As cores seguem o design original:

- **Primary**: `#D64550` - Vermelho (item ativo, botão adicionar)
- **Secondary**: `#FA9500` - Laranja (accent)
- **Tertiary**: `#A7AA29` - Verde oliva (accent)
- **Sidebar BG**: `#211A1E` - Fundo escuro
- **Sidebar Icon**: `#FDFFFC` - Branco suave para ícones

## Dependências

- React
- StyleX
- Material Icons (Google Fonts)

## Notas de Manutenção

- Para alterar cores, edite os valores nos arquivos `.stylex.ts`
- Para adicionar novos itens de navegação, apenas passe novos objetos no array `navItems`
- Para modificar o comportamento hover, edite `sidebarNavItem.stylex.ts`
- Tooltips aparecem automaticamente ao passar o mouse sobre os itens
- O componente é totalmente responsivo (80px em mobile, 96px em desktop)
