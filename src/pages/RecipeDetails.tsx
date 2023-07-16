import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../api/store';
import { RecipeNotFound } from './RecipeNotFound';
import { BeerRecipe } from '../interfaces/BeerRecipe';

export const RecipeDetails: React.FC = () => {
  const [recipe, setRecipe] = useState<BeerRecipe | null>(null);
  
  const { getRecipeById } = useRecipeStore();
  const { recipeId } = useParams();

  useEffectOnce(() => {
    getRecipeById(Number(recipeId))
      .then((recipe) => setRecipe(recipe))
      .catch(() => setRecipe(null));
  });

  if (!recipe) return <RecipeNotFound />;

  return (
    <>
      {recipe.id}
      {recipe.name}
    </>
  );
}
