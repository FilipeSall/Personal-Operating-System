import { MdDelete, MdEdit } from 'react-icons/md';
import { detailActions, detailActionButton } from '../styles/todo-detail-modal.styles';

interface TodoDetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function TodoDetailActions({ onEdit, onDelete }: TodoDetailActionsProps) {
  return (
    <div className={detailActions}>
      <button type="button" className={detailActionButton({ variant: 'secondary' })} onClick={onEdit}>
        <MdEdit size={18} />
        Editar
      </button>
      <button type="button" className={detailActionButton({ variant: 'danger' })} onClick={onDelete}>
        <MdDelete size={18} />
        Excluir
      </button>
    </div>
  );
}
