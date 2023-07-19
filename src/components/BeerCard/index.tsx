import { useRef } from 'react';
import { useSelectable } from '../../hooks/useSelectable';
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import { stringifyUnitValue } from '../../utils/units';
import { Chip } from '../Chip';
import './index.css';

interface BeerCardProps {
  recipe: BeerRecipe;
  onClick?: (recipe: BeerRecipe) => void;
  onToggleSelect?: (recipe: BeerRecipe) => void;
}

export const BeerCard: React.FC<BeerCardProps> = ({ 
  recipe,
  onClick,
  onToggleSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useSelectable(cardRef, () => {
    if (onToggleSelect) onToggleSelect(recipe)
  });

  const onTouchOrClick = () => {
    if (onClick) onClick(recipe);
  };

  return (
    <div 
      className='beer-card' 
      onClick={onTouchOrClick} 
      ref={cardRef}
    >
      <div className='beer-card__image__container'>
        <img className='beer-card__image' src={ recipe.image_url } />
      </div>
      <div className='beer-card__content'>
        <h2 className='beer-card__name'>{ recipe.name }</h2>
        <p className='beer-card__description'>{ recipe.description }</p>
        <div className='beer-card__details beer-details'>
          <div className='beer-details__stats beer-stats'>
            <Chip 
              title='Alchohol' 
              content={stringifyUnitValue(recipe.abv, '%')}
              color='#222222'
            />
            <Chip 
              title='IBU' 
              content={stringifyUnitValue(recipe.ibu)}
              color='#222222'
            />
            <Chip 
              title='ph' 
              content={stringifyUnitValue(recipe.ph)}
              color='#222222'
            />
          </div>
          <div className='beer-details__date beer-date'>
            <Chip 
              title='Brewed In' 
              content={stringifyUnitValue(recipe.first_brewed)} 
              color='#333333'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
