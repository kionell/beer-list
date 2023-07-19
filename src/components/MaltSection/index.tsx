import { BeerMalt } from "../../interfaces/BeerRecipe";
import { Malt } from "../Malt";
import './index.css';

interface MaltSectionProps {
  items: BeerMalt[];
}

export const MaltSection: React.FC<MaltSectionProps> = ({ items }) => {
  return (
    <section className='malt__section ingredients__section'>
      <h3 className='malt__title'>Malt</h3>
      <div className='malt__ingredients'>
        {
          items.map((item) => {
            return (
              <Malt 
                key={`${item.name}-${item.amount.value}-${item.amount.unit}`}
                {...item}
              />
            );
          })
        }
      </div>
    </section>
  );
}
