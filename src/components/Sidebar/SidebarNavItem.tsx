import React, { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './styles/sidebarNavItem.stylex';

interface SidebarNavItemProps {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  href,
  isActive = false,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...stylex.props(
        styles.link,
        isActive ? styles.linkActive : styles.linkInactive
      )}
    >
      <span className="material-icons-round" {...stylex.props(styles.icon)}>
        {icon}
      </span>
      <span
        {...stylex.props(
          styles.tooltip,
          isHovered && styles.tooltipVisible
        )}
      >
        {label}
      </span>
    </a>
  );
};
