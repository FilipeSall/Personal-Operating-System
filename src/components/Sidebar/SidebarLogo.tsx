import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './styles/sidebarLogo.stylex';

interface SidebarLogoProps {
  icon?: string;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({
  icon = 'dashboard'
}) => {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.logoBox)}>
        <span className="material-icons-round" {...stylex.props(styles.icon)}>
          {icon}
        </span>
      </div>
    </div>
  );
};
