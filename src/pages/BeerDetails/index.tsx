import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipeStore } from '../../services/store'
import { BeerRecipe } from '../../interfaces/BeerRecipe'
import { Chips } from '../../components/Chips';
import { TitledList } from '../../components/TitledList';
import { Method } from '../../components/Method';
import { InfoCard } from '../../components/InfoCard';
import { Ingredients } from '../../components/Ingredients';
import { NotFound } from '../NotFound';
import { stringifyUnitValue } from '../../utils/units';
import { Contributor } from '../../components/Contributor';
import './index.css';

export const BeerDetails: React.FC = () => {
  const [recipe, setRecipe] = useState<BeerRecipe | null | undefined>();
  
  const { getRecipeById } = useRecipeStore();
  const { id } = useParams();

  useEffect(() => {
    getRecipeById(Number(id))
      .then((recipe) => setRecipe(recipe))
      .catch(() => setRecipe(null));
  }, [id, getRecipeById]);

  if (recipe === null) {
    return <NotFound />;
  }

  if (!recipe) return;

  return (
    <div className='beer-details'>
      <div className='beer-details__header'>
        <div className='beer-details__image__container'>
          <img
            className='beer-details__image'
            src={recipe.image_url} 
            alt='beer logo' 
          />
        </div>
        <div className='beer-details__info beer-info'>
          <h1 className='beer-info__name'>{recipe.name}</h1>
          <h3 className='beer-info__tagline'>{recipe.tagline}</h3>
          <p className='beer-info__description'>{recipe.description}</p>
          <div>
            <Chips
              items={[
                { 
                  title: 'ABV', 
                  content: stringifyUnitValue(recipe.abv, '%') 
                },
                { 
                  title: 'OG', 
                  content: stringifyUnitValue(recipe.target_og / 1000) 
                },
                { 
                  title: 'FG', 
                  content: stringifyUnitValue(recipe.target_fg / 1000) 
                },
                { 
                  title: 'SRM', 
                  content: stringifyUnitValue(recipe.srm) 
                },
                { 
                  title: 'IBU', 
                  content: stringifyUnitValue(recipe.ibu) 
                },
              ]} 
            />
            <Chips
              title='Batch Sizing'
              items={[
                { 
                  title: 'Volume', 
                  content: stringifyUnitValue(recipe.volume, true)
                },
                { 
                  title: 'Boil Volume', 
                  content: stringifyUnitValue(recipe.boil_volume, true)
                },
              ]} 
            />
          </div>
          <TitledList
            className='beer-info__pairings'
            title='Food Pairings'
            items={recipe.food_pairing} 
          />
          <Contributor contributor={recipe.contributed_by} />
        </div>
      </div>
      <InfoCard className='beer-details__tips'>{recipe.brewers_tips}</InfoCard>
      <Method {...recipe.method} />
      <Ingredients {...recipe.ingredients} />
    </div>
  )
}