import { useEffect, useRef } from "react";
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
    hasSelected,
    setSelected,
    startIndex,
    endIndex,
  } = useRecipeStore();

  const selectedRef = useRef<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffectOnce(() => {
    populateRecipes(true);
  });

  /**
   * This should deselect all recipes whose ID is outside of bounds. 
   */
  useEffect(() => {
    if (!hasSelected) return;

    for (const id of selectedRef.current.values()) {
      if (id >= startIndex && id <= endIndex) continue;

      selectedRef.current.delete(id);
    }

    setSelected(selectedRef.current.size > 0);
  }, [hasSelected, startIndex, endIndex, setSelected]);

  const deleteSelectedRecipes = () => {
    deleteRecipes([...selectedRef.current]);

    selectedRef.current.clear();

    setSelected(false);
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

    setSelected(selectedRef.current.size > 0);
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
        disabled={!hasSelected}
      />
    </div>
  );
}
