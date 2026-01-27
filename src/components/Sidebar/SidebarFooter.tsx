import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './styles/sidebarFooter.stylex';

interface SidebarFooterProps {
  onLogout?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  onLogout
}) => {
  return (
    <div {...stylex.props(styles.container)}>
      <button
        {...stylex.props(styles.button)}
        onClick={onLogout}
        aria-label="Logout"
      >
        <span className="material-icons-round" {...stylex.props(styles.icon)}>
          logout
        </span>
      </button>
    </div>
  );
};
