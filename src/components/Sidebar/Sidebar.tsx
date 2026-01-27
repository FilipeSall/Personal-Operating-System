import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './styles/sidebar.stylex';
import { SidebarLogo } from './SidebarLogo';
import { SidebarNav, NavItem } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';

interface SidebarProps {
  logoIcon?: string;
  navItems: NavItem[];
  onNavItemClick?: (item: NavItem) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  logoIcon,
  navItems,
  onNavItemClick,
  onLogout
}) => {
  return (
    <aside {...stylex.props(styles.container)}>
      <SidebarLogo icon={logoIcon} />
      <SidebarNav items={navItems} onItemClick={onNavItemClick} />
      <SidebarFooter onLogout={onLogout} />
    </aside>
  );
};
