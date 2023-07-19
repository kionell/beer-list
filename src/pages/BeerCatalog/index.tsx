import { useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../../services/store"
import { BeerCatalogItem } from "../../components/BeerCatalogItem";
import { BeerCatalogDeleteButton } from "../../components/BeerCatalogDeleteButton";
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import './index.css';

export const BeerCatalog: React.FC = () => {
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
    navigate(`/beers/${recipe.id}`);
    
    // Reset scroll top position on path change.
    window.scrollTo({ top: 0 });
  };

  const toggleRecipeSelection = (recipe: BeerRecipe) => {
    selectedRef.current.has(recipe.id) 
      ? selectedRef.current.delete(recipe.id) 
      : selectedRef.current.add(recipe.id);

    setButtonDisabled(selectedRef.current.size === 0);
  };

  return (
    <div className="beer-catalog">
      {
        getCurrentRecipes().map((recipe, index) => {
          return (
            <BeerCatalogItem 
              recipe={recipe}
              index={index}
              key={recipe.id}
              onClick={navigateToDetails}
              onToggleSelect={toggleRecipeSelection} 
            />
          );
        })
      }
      <BeerCatalogDeleteButton
        onClick={deleteSelectedRecipes}
        disabled={isButtonDisabled}
      />
    </div>
  );
}
