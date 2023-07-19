import { BeerIngredients } from '../../interfaces/BeerRecipe';
import { MaltSection } from '../MaltSection';
import { HopSection } from '../HopSection';
import { YeastSection } from '../YeastSection';
import './index.css';

export const Ingredients: React.FC<BeerIngredients> = ({
  malt, 
  hops, 
  yeast
}) => {
  return (
    <div className='ingredients__container'>
      <MaltSection items={malt} />
      <HopSection items={hops} />
      <YeastSection yeast={yeast} />
    </div>
  )
}
