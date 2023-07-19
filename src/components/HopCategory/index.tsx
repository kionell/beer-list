import { BeerHops } from "../../interfaces/BeerRecipe";
import { Hop } from "../Hop";
import './index.css';

interface HopCategoryProps {
  name: string;
  items: BeerHops[];
}

export const HopCategory: React.FC<HopCategoryProps> = ({ name, items }) => {
  return (
    <div className='hops__category'>
      <h4 className='hops__category__name'>{name}</h4>
      <div className='hops__ingredients'>
        { 
          items.map((item) => {
            return <Hop 
              key={`${item.name}-${item.amount.value}-${item.attribute}`}
              {...item} 
            />;
          })
        }
      </div>
    </div>
  );
}
