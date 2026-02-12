import { MdDelete, MdEdit } from 'react-icons/md';
import { detailActions, detailActionButton } from '../styles/todo-detail-modal.styles';

/**
 * Renderiza os botões de ação do modal de detalhes do todo.
 *
 * Exibe dois botões: um para editar e outro para excluir o todo selecionado.
 *
 * @param {TodoDetailActionsProps} props - Props do componente
 * @param {() => void} props.onEdit - Função callback executada quando o botão de editar é clicado. Abre o modal de edição do todo
 * @param {() => void} props.onDelete - Função callback executada quando o botão de excluir é clicado. Abre o modal de confirmação de exclusão
 */
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
