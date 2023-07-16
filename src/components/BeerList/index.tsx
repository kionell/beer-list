import { useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { useRecipeStore } from "../../api/store"
import { BeerCard } from "../BeerCard";
import { BeerListDeleteButton } from "../BeerListDeleteButton";
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import './index.css';

export const BeerList: React.FC = () => {
  const { recipes, populateRecipes, deleteRecipes } = useRecipeStore();

  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const selectedRef = useRef<Set<number>>(new Set());

  useEffectOnce(() => {
    populateRecipes();
  });

  const deleteSelectedRecipes = () => {
    deleteRecipes([...selectedRef.current]);

    selectedRef.current.clear();

    setButtonDisabled(true);
  }

  const toggleRecipeSelection = (recipe: BeerRecipe) => {
    selectedRef.current.has(recipe.id) 
      ? selectedRef.current.delete(recipe.id) 
      : selectedRef.current.add(recipe.id);

    setButtonDisabled(selectedRef.current.size === 0);
  };

  return (
    <div className="beer-list">
      {
        recipes.map((recipe) => {
          return (
            <BeerCard 
              recipe={recipe} 
              key={recipe.id}
              onClick={navigateToDetails}
              onToggleSelect={toggleRecipeSelection} 
            />
          );
        })
      }
      <BeerListDeleteButton
        onClick={deleteSelectedRecipes}
        disabled={isButtonDisabled}
      />
    </div>
  );
}
