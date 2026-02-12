import { MdRepeat } from 'react-icons/md';
import { detailBadge, detailTags } from '../styles/todo-detail-modal.styles';

/**
 * Renderiza as tags/badges do todo no modal de detalhes.
 *
 * Exibe badges visuais que identificam características do todo:
 * - Badge do tipo de todo (com cor, ícone e label personalizados)
 * - Badge de recorrência (quando o todo se repete)
 *
 * @param {TodoDetailTagsProps} props - Props do componente
 * @param {string} [props.typeColor] - Cor em hexadecimal do tipo de todo, usada como cor do badge e do ícone
 * @param {string} [props.typeLabel] - Label descritiva do tipo de todo (ex: "Trabalho", "Pessoal")
 * @param {React.ComponentType<{ size?: number; color?: string }> | null} [props.Icon] - Componente de ícone React a ser exibido no badge do tipo (geralmente um ícone da biblioteca react-icons)
 * @param {boolean} props.hasRepeat - Indica se o todo possui recorrência. Quando true, exibe o badge "Recorrente"
 */
type TodoDetailTagsProps = {
  typeColor?: string;
  typeLabel?: string;
  Icon?: React.ComponentType<{ size?: number; color?: string }> | null;
  hasRepeat: boolean;
};

export function TodoDetailTags({ typeColor, typeLabel, Icon, hasRepeat }: TodoDetailTagsProps) {
  return (
    <div className={detailTags}>
      {typeColor && typeLabel && (
        <span className={detailBadge} style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
          {Icon && <Icon size={14} color={typeColor} />}
          {typeLabel}
        </span>
      )}
      {hasRepeat && (
        <span className={detailBadge} style={{ backgroundColor: '#FA950020', color: '#FA9500' }}>
          <MdRepeat size={14} />
          Recorrente
        </span>
      )}
    </div>
  );
}
