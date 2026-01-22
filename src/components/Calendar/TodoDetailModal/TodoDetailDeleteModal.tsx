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

type TodoDetailDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (scope: 'single' | 'week' | 'month' | 'all') => void;
};

export function TodoDetailDeleteModal({ isOpen, onClose, onDelete }: TodoDetailDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={modalOverlay} onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className={confirmModalContent}>
        <div className={confirmHeader}>
          <span className={confirmTitle}>Qual você quer excluir?</span>
          <button type="button" className={modalCloseButton} onClick={onClose}>
            <MdClose size={18} />
          </button>
        </div>
        <div className={confirmOptions}>
          <button
            type="button"
            className={confirmOptionButton({ variant: 'danger' })}
            onClick={() => onDelete('single')}
          >
            Apenas esta
          </button>
          <button
            type="button"
            className={confirmOptionButton({ variant: 'danger' })}
            onClick={() => onDelete('week')}
          >
            Todas da semana
          </button>
          <button
            type="button"
            className={confirmOptionButton({ variant: 'danger' })}
            onClick={() => onDelete('month')}
          >
            Todas do mês
          </button>
          <button
            type="button"
            className={confirmOptionButton({ variant: 'danger' })}
            onClick={() => onDelete('all')}
          >
            Todas do calendário
          </button>
        </div>
      </div>
    </div>
  );
}
