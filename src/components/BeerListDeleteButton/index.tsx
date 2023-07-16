import { MouseEventHandler } from "react";
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import './index.css';

interface DeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const BeerListDeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return (
    <button {...props} className="beer-list__button">
      <DeleteIcon />
    </button>
  );
}
