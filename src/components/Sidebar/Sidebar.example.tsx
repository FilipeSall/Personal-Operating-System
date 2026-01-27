import React from 'react';
import { Sidebar, NavItem } from './index';

/**
 * Exemplo de uso do componente Sidebar
 *
 * Este arquivo demonstra como utilizar o componente Sidebar
 * com todos os seus subcomponentes de forma componentizada.
 */

export const SidebarExample: React.FC = () => {
  // Define os itens de navegação
  const navItems: NavItem[] = [
    {
      icon: 'home',
      label: 'Home',
      href: '#',
      isActive: true // Marca o primeiro item como ativo
    },
    {
      icon: 'check_circle',
      label: 'Tarefas & Agenda',
      href: '#',
    },
    {
      icon: 'account_balance_wallet',
      label: 'Finanças',
      href: '#',
    },
    {
      icon: 'link',
      label: 'Links Úteis',
      href: '#',
    },
    {
      icon: 'folder',
      label: 'Projetos',
      href: '#',
    },
    {
      icon: 'lock',
      label: 'Cofre',
      href: '#',
    },
  ];

  // Handler para clique em item de navegação
  const handleNavItemClick = (item: NavItem) => {
    console.log('Navegando para:', item.label);
    // Aqui você pode adicionar lógica de roteamento
  };

  // Handler para logout
  const handleLogout = () => {
    console.log('Usuário saindo...');
    // Aqui você pode adicionar lógica de logout
  };

  return (
    <Sidebar
      logoIcon="dashboard"
      navItems={navItems}
      onNavItemClick={handleNavItemClick}
      onLogout={handleLogout}
    />
  );
};
