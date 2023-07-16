import { useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../../api/store"
import { BeerCard } from "../BeerCard";
import { BeerListDeleteButton } from "../BeerListDeleteButton";
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import './index.css';

export const BeerList: React.FC = () => {
  const { recipes, populateRecipes, deleteRecipes } = useRecipeStore();

  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const selectedRef = useRef<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffectOnce(() => {
    populateRecipes();
  });

  const deleteSelectedRecipes = () => {
    deleteRecipes([...selectedRef.current]);

    selectedRef.current.clear();

    setButtonDisabled(true);
  }

  const navigateToDetails = (recipe: BeerRecipe) => {
    navigate(`/${recipe.id}`);
  };

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
