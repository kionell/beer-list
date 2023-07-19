import { MouseEventHandler } from "react";
import { DeleteIcon } from "../Icon";
import './index.css';

interface DeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const BeerCatalogDeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return (
    <button {...props} className="beer-catalog__button">
      <DeleteIcon size={30} />
    </button>
  );
}
