import { MdClose } from 'react-icons/md';
import {
  detailHeader,
  detailTitle,
  modalCloseButton,
} from '../styles/todo-detail-modal.styles';

/**
 * Cabeçalho do modal de detalhes do todo.
 *
 * Exibe o título do todo e um botão para fechar o modal.
 * Opcionalmente mostra um tooltip com o título completo quando este é muito longo.
 *
 * @param {TodoDetailHeaderProps} props - Props do componente
 * @param {string} props.title - Texto do título do todo a ser exibido no cabeçalho
 * @param {boolean} props.showTitleTooltip - Define se deve exibir um tooltip com o título completo ao passar o mouse (útil para títulos truncados)
 * @param {() => void} props.onClose - Função callback executada ao clicar no botão de fechar (X) do modal
 */
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
