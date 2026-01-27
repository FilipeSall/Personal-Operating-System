import * as stylex from "@stylexjs/stylex";
import {
  MdDashboard,
  MdHome,
  MdCheckCircle,
  MdAccountBalanceWallet,
  MdLink,
  MdFolder,
  MdLock,
  MdLogout,
} from "react-icons/md";
import { styles } from "./styles";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <a
      {...stylex.props(
        styles.navLink,
        styles.navLinkWithTooltip,
        active && styles.navLinkActive
      )}
      onClick={onClick}
    >
      {icon}
      <span {...stylex.props(styles.tooltip)}>{label}</span>
    </a>
  );
}

export default function Sidebar() {
  return (
    <aside {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.logo)}>
        <div {...stylex.props(styles.logoInner)}>
          <MdDashboard />
        </div>
      </div>

      <nav {...stylex.props(styles.nav)}>
        <NavItem icon={<MdHome />} label="Home" active={true} />
        <NavItem icon={<MdCheckCircle />} label="Tarefas & Agenda" />
        <NavItem icon={<MdAccountBalanceWallet />} label="Finanças" />
        <NavItem icon={<MdLink />} label="Links Úteis" />
        <NavItem icon={<MdFolder />} label="Projetos" />
        <NavItem icon={<MdLock />} label="Cofre" />
      </nav>

      <div {...stylex.props(styles.footer)}>
        <button {...stylex.props(styles.logoutButton)}>
          <MdLogout />
        </button>
      </div>
    </aside>
  );
}
