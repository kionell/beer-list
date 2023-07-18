import { MouseEventHandler } from "react";
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import './index.css';

interface DeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const BeerCatalogDeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return (
    <button {...props} className="beer-catalog__button">
      <DeleteIcon />
    </button>
  );
}
