import { MdRepeat } from 'react-icons/md';
import { detailBadge, detailTags } from '../styles/todo-detail-modal.styles';

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
