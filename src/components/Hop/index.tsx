import { BeerHops } from "../../interfaces/BeerRecipe";
import { Amount } from "../Amount";
import { Chip } from "../Chip";
import { HopIcon } from "../Icon";
import './index.css';

export const Hop: React.FC<BeerHops> = ({ amount, attribute, name }) => {
  return (
    <div className='hop__ingredient'>
      <HopIcon size={30} color='#41aa38' />
      <div className='hop__information'>
        <Amount className='hop_amount' name={name} amount={amount} />
        <div className='hop__purpose'>
          <Chip title='Purpose' content={attribute}></Chip>
        </div>
      </div>
    </div>
  );
}
