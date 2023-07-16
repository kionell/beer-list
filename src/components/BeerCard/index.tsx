import { useRef } from 'react';
import { useSelectable } from '../../hooks/useSelectable';
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import { stringifyUnitValue } from '../../utils/units';
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
            <span>
              <span className='beer-stats__name'>Alcohol: </span>
              <span className='beer-stats__unit'>
                { 
                  stringifyUnitValue(recipe.abv, '%')
                }
              </span>
            </span>
            <span>
              <span className='beer-stats__name'>IBU: </span>
              <span className='beer-stats__unit'>
                { 
                  stringifyUnitValue(recipe.ibu) 
                }
              </span>
            </span>
            <span>
              <span className='beer-stats__name'>pH: </span>
              <span className='beer-stats__unit'>
                { 
                  stringifyUnitValue(recipe.ph) 
                }
              </span>
            </span>
          </div>
          <div className='beer-details__date beer-date'>
            <span>
              <span className='beer-date__name'>Brewed In: </span>
              <span className='beer-date__value'>
                {
                  stringifyUnitValue(recipe.first_brewed)
                }
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
