import { MdClose } from 'react-icons/md';
import {
  detailHeader,
  detailTitle,
  modalCloseButton,
} from '../styles/todo-detail-modal.styles';

type TodoDetailHeaderProps = {
  title: string;
  showTitleTooltip: boolean;
  onClose: () => void;
};

export function TodoDetailHeader({ title, showTitleTooltip, onClose }: TodoDetailHeaderProps) {
  return (
    <div className={detailHeader}>
      <span className={detailTitle} title={showTitleTooltip ? title : undefined}>
        {title}
      </span>
      <button type="button" className={modalCloseButton} onClick={onClose}>
        <MdClose size={20} />
      </button>
    </div>
  );
}
