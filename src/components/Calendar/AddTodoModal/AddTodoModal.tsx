import { createPortal } from 'react-dom';
import type { Todo } from '../../../types/calendar';
import { useAddTodoModal } from '../hooks/useAddTodoModal';
import { AddTodoModalView } from './AddTodoModalView';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo | null;
}

export function AddTodoModal({ isOpen, onClose, todo }: AddTodoModalProps) {
  const { state, derived, actions } = useAddTodoModal({ onClose, todo });

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const modal = <AddTodoModalView state={state} derived={derived} actions={actions} />;

  return createPortal(modal, document.body);
}
