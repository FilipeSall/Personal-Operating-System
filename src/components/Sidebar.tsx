import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import styles from "../styles/sidebarStyles";

const navItems = [
  { icon: "home", label: "Home", isActive: true },
  { icon: "check_circle", label: "Tarefas & Agenda" },
  { icon: "account_balance_wallet", label: "Financas" },
  { icon: "link", label: "Links Uteis" },
  { icon: "folder", label: "Projetos" },
  { icon: "lock", label: "Cofre" },
];

function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  return (
    <aside aria-label="Menu lateral" {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.logoWrapper)}>
        <div {...stylex.props(styles.logo)}>
          <span className="material-icons-round" {...stylex.props(styles.icon)}>
            dashboard
          </span>
        </div>
      </div>
      <nav {...stylex.props(styles.nav)}>
        {navItems.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
          <a
            key={item.label}
            href="#"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            {...stylex.props(
              styles.navItemBase,
              item.isActive ? styles.navItemActive : styles.navItemInactive,
              isHovered && item.isActive && styles.navItemActiveHover,
              isHovered && !item.isActive && styles.navItemInactiveHover
            )}
          >
            <span className="material-icons-round" {...stylex.props(styles.icon)}>
              {item.icon}
            </span>
            <span
              className="sidebarTooltip"
              {...stylex.props(
                styles.tooltip,
                isHovered ? styles.tooltipVisible : styles.tooltipHidden
              )}
            >
              {item.label}
            </span>
          </a>
          );
        })}
      </nav>
      <div {...stylex.props(styles.footer)}>
        <button
          aria-label="Sair"
          type="button"
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          onFocus={() => setIsLogoutHovered(true)}
          onBlur={() => setIsLogoutHovered(false)}
          {...stylex.props(
            styles.logoutButton,
            isLogoutHovered && styles.logoutButtonHover
          )}
        >
          <span className="material-icons-round" {...stylex.props(styles.icon)}>
            logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
