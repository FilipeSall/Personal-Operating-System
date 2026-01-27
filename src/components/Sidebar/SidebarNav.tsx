import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './styles/sidebarNav.stylex';
import { SidebarNavItem } from './SidebarNavItem';

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

interface SidebarNavProps {
  items: NavItem[];
  onItemClick?: (item: NavItem) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  onItemClick
}) => {
  return (
    <nav {...stylex.props(styles.container)}>
      {items.map((item, index) => (
        <SidebarNavItem
          key={index}
          icon={item.icon}
          label={item.label}
          href={item.href}
          isActive={item.isActive}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </nav>
  );
};
