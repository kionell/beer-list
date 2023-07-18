import { useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../../api/store"
import { BeerListItem } from "../../components/BeerListItem";
import { BeerListDeleteButton } from "../../components/BeerListDeleteButton";
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import './index.css';

export const BeerList: React.FC = () => {
  const { 
    populateRecipes, 
    deleteRecipes,
    getCurrentRecipes, 
  } = useRecipeStore();

  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const selectedRef = useRef<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffectOnce(() => {
    populateRecipes(true);
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
        getCurrentRecipes().map((recipe, index) => {
          return (
            <BeerListItem 
              recipe={recipe}
              index={index}
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
