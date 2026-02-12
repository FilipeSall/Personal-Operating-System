import { MdAccessTime, MdCalendarToday, MdNotes, MdRepeat } from 'react-icons/md';
import type { RepeatDuration, Todo, Weekday } from '../../../types/calendar';
import {
  detailSection,
  detailRow,
  detailIcon,
  detailLabel,
  detailValue,
  detailCommentContainer,
  detailCommentText,
} from '../styles/todo-detail-modal.styles';
import { DURATION_LABELS, REPEAT_TYPE_LABELS } from '../consts/repeatOptions';
import { WEEKDAY_LABELS } from '../consts/weekdays';

/**
 * Seção de metadados do todo no modal de detalhes.
 *
 * Exibe informações detalhadas sobre o todo organizadas em linhas:
 * - Data do todo
 * - Horário de início e fim
 * - Horário de pausa (se configurado)
 * - Comentários adicionais (se existirem)
 * - Configurações de repetição (tipo, dias da semana, duração) quando o todo é recorrente
 *
 * @param {TodoDetailMetaSectionProps} props - Props do componente
 * @param {Todo} props.todo - Objeto completo do todo contendo todas as informações (horários, comentários, configurações de repetição, etc.)
 * @param {string} props.formattedDate - Data do todo já formatada para exibição (ex: "15 de fev. de 2026")
 * @param {boolean} props.hasRepeat - Indica se o todo possui recorrência. Quando true, exibe as informações de repetição (tipo, dias, duração)
 */
type TodoDetailMetaSectionProps = {
  todo: Todo;
  formattedDate: string;
  hasRepeat: boolean;
};

export function TodoDetailMetaSection({ todo, formattedDate, hasRepeat }: TodoDetailMetaSectionProps) {
  return (
    <div className={detailSection}>
      <div className={detailRow}>
        <span className={detailIcon}>
          <MdCalendarToday size={18} />
        </span>
        <span className={detailLabel}>Data</span>
        <span className={detailValue}>{formattedDate}</span>
      </div>

      <div className={detailRow}>
        <span className={detailIcon}>
          <MdAccessTime size={18} />
        </span>
        <span className={detailLabel}>Horário</span>
        <span className={detailValue}>
          {todo.startTime} - {todo.endTime}
        </span>
      </div>

      {todo.pauseStart && todo.pauseEnd && (
        <div className={detailRow}>
          <span className={detailIcon} style={{ visibility: 'hidden' }}>
            <MdAccessTime size={18} />
          </span>
          <span className={detailLabel}>Pausa</span>
          <span className={detailValue}>
            {todo.pauseStart} - {todo.pauseEnd}
          </span>
        </div>
      )}

      {todo.comments && (
        <div className={detailRow}>
          <span className={detailIcon}>
            <MdNotes size={18} />
          </span>
          <span className={detailLabel}>Comentários</span>
          <div className={detailCommentContainer}>
            <span className={detailCommentText}>{todo.comments}</span>
          </div>
        </div>
      )}

      {hasRepeat && (
        <>
          <div className={detailRow}>
            <span className={detailIcon}>
              <MdRepeat size={18} />
            </span>
            <span className={detailLabel}>Repetição</span>
            <span className={detailValue}>{REPEAT_TYPE_LABELS[todo.repeat.type]}</span>
          </div>

          {todo.repeat.type === 'custom' && todo.repeat.weekdays && (
            <div className={detailRow}>
              <span className={detailIcon} style={{ visibility: 'hidden' }}>
                <MdRepeat size={18} />
              </span>
              <span className={detailLabel}>Dias</span>
              <span className={detailValue}>
                {todo.repeat.weekdays.map((d: Weekday) => WEEKDAY_LABELS[d]).join(', ')}
              </span>
            </div>
          )}

          {todo.repeat.duration && (
            <div className={detailRow}>
              <span className={detailIcon} style={{ visibility: 'hidden' }}>
                <MdRepeat size={18} />
              </span>
              <span className={detailLabel}>Duração</span>
              <span className={detailValue}>{DURATION_LABELS[todo.repeat.duration as RepeatDuration]}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
