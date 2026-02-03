import {
  sidebarHeader,
  sidebarTitleBlock,
  sidebarKicker,
  sidebarTitle,
} from '../../styles/calendar-sidebar.styles';

type CalendarSidebarHeaderProps = {
  dateLabel: string;
};

/**
 * Renderiza o cabeçalho do painel lateral do calendário.
 */
export function CalendarSidebarHeader({
  dateLabel,
}: CalendarSidebarHeaderProps) {
  return (
    <div className={sidebarHeader}>
      <div className={sidebarTitleBlock}>
        <span className={sidebarKicker}>Agenda do dia</span>
        <h3 className={sidebarTitle}>{dateLabel}</h3>
      </div>
    </div>
  );
}
