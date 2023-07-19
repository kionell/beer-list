import { BeerMalt } from "../../interfaces/BeerRecipe";
import { Amount } from "../Amount";
import { MaltIcon } from "../Icon";
import './index.css';

export const Malt: React.FC<BeerMalt> = ({ amount, name }) => {
  return (
    <div key={name} className='malt__ingredient'>
      <MaltIcon size={30} color='#eaba61' />
      <Amount className='malt__information' name={name} amount={amount} />
    </div>
  );
}
