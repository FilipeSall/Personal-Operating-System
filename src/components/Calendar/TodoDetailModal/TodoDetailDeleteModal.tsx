import { MdClose } from 'react-icons/md';
import {
  confirmModalContent,
  confirmHeader,
  confirmTitle,
  confirmOptions,
  confirmOptionButton,
  modalOverlay,
  modalCloseButton,
} from '../styles/todo-detail-modal.styles';

/**
 * Modal de confirmação de exclusão de todo com opções de escopo.
 *
 * Exibe um modal que permite ao usuário confirmar a exclusão de um todo,
 * oferecendo diferentes escopos de exclusão quando o todo é recorrente
 * (excluir apenas esta ocorrência, todas da semana, todas do mês, ou todas do calendário).
 *
 * @param {TodoDetailDeleteModalProps} props - Props do componente
 * @param {boolean} props.isOpen - Controla se o modal está visível ou oculto
 * @param {() => void} props.onClose - Função callback executada ao fechar o modal (ao clicar no X ou fora do modal)
 * @param {(scope: 'single' | 'week' | 'month' | 'all') => void} props.onDelete - Função callback executada ao confirmar a exclusão, recebendo o escopo selecionado pelo usuário
 * @param {'confirm' | 'scope'} props.mode - Modo de exibição do modal: 'confirm' para confirmação simples (Sim/Não) ou 'scope' para seleção de escopo de exclusão
 * @param {readonly ('single' | 'week' | 'month' | 'all')[]} props.scopes - Array com os escopos de exclusão disponíveis para o usuário escolher (usado apenas quando mode='scope')
 */
type TodoDetailDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (scope: 'single' | 'week' | 'month' | 'all') => void;
  mode: 'confirm' | 'scope';
  scopes: readonly ('single' | 'week' | 'month' | 'all')[];
};

const SCOPE_LABELS: Record<'single' | 'week' | 'month' | 'all', string> = {
  single: 'Apenas esta',
  week: 'Todas da semana',
  month: 'Todas do mês',
  all: 'Todas do calendário',
};

export function TodoDetailDeleteModal({
  isOpen,
  onClose,
  onDelete,
  mode,
  scopes,
}: TodoDetailDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={modalOverlay} onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className={confirmModalContent}>
        <div className={confirmHeader}>
          <span className={confirmTitle}>
            {mode === 'confirm' ? 'Tem certeza que deseja excluir?' : 'Qual você quer excluir?'}
          </span>
          <button type="button" className={modalCloseButton} onClick={onClose}>
            <MdClose size={18} />
          </button>
        </div>
        <div className={confirmOptions}>
          {mode === 'confirm' ? (
            <>
              <button
                type="button"
                className={confirmOptionButton({ variant: 'danger' })}
                onClick={() => onDelete('single')}
              >
                Sim
              </button>
              <button
                type="button"
                className={confirmOptionButton({ variant: 'secondary' })}
                onClick={onClose}
              >
                Não
              </button>
            </>
          ) : (
            scopes.map((scope) => (
              <button
                key={scope}
                type="button"
                className={confirmOptionButton({ variant: 'danger' })}
                onClick={() => onDelete(scope)}
              >
                {SCOPE_LABELS[scope]}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
