import { useMemo } from "react";
import { BeerHops } from "../../interfaces/BeerRecipe";
import { HopCategory } from "../HopCategory";
import './index.css';

interface HopSectionProps {
  items: BeerHops[];
}

export const HopSection: React.FC<HopSectionProps> = ({ items }) => {
  const categories: JSX.Element[] = useMemo(() => {
    const hops = new Map<BeerHops['add'], BeerHops[]>();
    
    for (const item of items) {
      if (!hops.has(item.add)) {
        hops.set(item.add, [item]);
      }
      else {
        hops.get(item.add)?.push(item);
      }
    }

    const categories: JSX.Element[] = [];

    hops.forEach((value, key) => {
      categories.push(
        <HopCategory 
          key={key}
          name={key.replace(/^\w/, c => c.toUpperCase())} 
          items={value} 
        />
      );
    });

    return categories;
  }, [items]);
  
  return (
    <section className='hops__section ingredients__section'>
      <h3 className='hops__title'>Hops</h3>
      <div className='hops__categories'>{categories}</div>
    </section>
  );
}
