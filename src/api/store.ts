import { create } from "zustand";
import { BeerRecipe } from "../interfaces/BeerRecipe";
import { fetchRecipe, fetchRecipes } from "./api";

interface RecipeListState {
  /**
   * The list of all fetched beer recipes.
   */
  recipes: BeerRecipe[];

  /**
   * Index of the first recipe that will be rendered on the screen.
   */
  startIndex: number;

  /**
   * Index of the last recipe that will be rendered on the screen.
   */
  endIndex: number;

  /**
   * Next page for fetching data from the API.
   */
  nextPage: number;

  /**
   * Creates a new slice of {@link recipes} array 
   * from {@link startIndex} to {@link endIndex} + 1.
   * @returns The array of beer recipes that should be rendered.
   */
  getCurrentRecipes: () => BeerRecipe[];

  /**
   * Tries to find a cached recipe by its ID.
   * Otherwise tries to fetch it from the API.
   * @param id Recipe ID.
   * @throws If recipe was not found.
   * @returns Found recipe.
   */
  getRecipeById: (id: number) => Promise<BeerRecipe>;
  
  /**
   * Deletes one or more beer recipe from {@link recipes} list.
   * Populates {@link recipes} list if there are not enough recipes.
   * @param ids The list of IDs of all beer recipes that should be deleted.
   */
  deleteRecipes: (ids: number[]) => Promise<void>;

  /**
   * Fetches beer recipes from the API using and adds them to {@link recipes} list.
   * Fetching is done until the length of {@link recipes} exceeds {@link endIndex}.
   * @param init Should {@link recipes} and {@link nextPage} be wiped before populate. 
   * @param recipes Optional list of beer recipes to fill in.
   */
  populateRecipes: (init?: boolean, recipes?: BeerRecipe[]) => Promise<void>;

  /**
   * Shifts {@link startIndex} and {@link endIndex} backward by a step. 
   * @param step The step.
   */
  moveBackward: (step?: number) => void;

  /**
   * Shifts {@link startIndex} and {@link endIndex} forward by a step. 
   * @param step The step.
   */
  moveForward: (step?: number) => void;

  /**
   * Sets the new difference between {@link startIndex} and {@link endIndex}.
   * @param limit The number of recipes that should be rendered.
   */
  setRecipeLimit: (limit?: number) => void;
}

export const useRecipeStore = create<RecipeListState>((set, get) => ({
  recipes: [],
  startIndex: 0,
  endIndex: Number(import.meta.env.VITE_BEERS_PER_PAGE) - 1,
  nextPage: 1,

  getCurrentRecipes() {
    const { startIndex, endIndex, recipes } = get();

    return recipes.slice(startIndex, endIndex + 1);
  },

  async getRecipeById(id) {
    const cachedRecipe = get().recipes.find((r) => r.id === id);

    if (cachedRecipe) {
      return cachedRecipe;
    }

    const fetchedRecipe = await fetchRecipe(id);

    if (fetchedRecipe.data?.length) {
      return fetchedRecipe.data[0];
    }

    throw new Error('Recipe was not found!');
  },

  async deleteRecipes(ids) {
    const { recipes, populateRecipes } = get();

    const newRecipes = recipes.filter((r) => !ids.includes(r.id));

    await populateRecipes(false, newRecipes);
  },

  async populateRecipes(init = false, recipes = get().recipes) {
    const { endIndex, nextPage } = get();

    const newRecipes = init ? [] : [...recipes];
    
    let newPage = init ? 1 : nextPage;

    while (newRecipes.length - 1 < endIndex) {
      /**
       * We want to increment current page only 
       * when there are not enough extra recipes.
       * This is done to prevent unwanted side effects
       * from multiple component mounts.
       */
      const fetchedRecipes = await fetchRecipes(newPage++);

      if (!fetchedRecipes.data && fetchedRecipes.error) {
        throw new Error(fetchedRecipes.error);
      }

      if (!fetchedRecipes.data?.length) {
        break;
      }

      newRecipes.push(...fetchedRecipes.data);
    }

    set({ recipes: newRecipes, nextPage: newPage });
  },

  moveBackward(step = 5) {
    const { startIndex, endIndex, populateRecipes } = get();
    
    if (startIndex <= 0) return;

    set({
      startIndex: startIndex - step,
      endIndex: endIndex - step,
    });

    populateRecipes();
  },

  moveForward(step = 5) {
    const { startIndex, endIndex, populateRecipes } = get();
    
    set({
      startIndex: startIndex + step,
      endIndex: endIndex + step,
    });

    populateRecipes();
  },

  setRecipeLimit(limit = Number(import.meta.env.VITE_BEERS_PER_PAGE) - 1) {
    const { endIndex, populateRecipes } = get();
    
    limit = Math.max(limit, Number(import.meta.env.VITE_BEERS_PER_PAGE) - 1);

    let newEndIndex = endIndex;
    let newStartIndex = endIndex - limit;

    if (endIndex < limit) {
      newEndIndex = endIndex - newStartIndex;
      newStartIndex = 0;
    }

    set({ 
      startIndex: newStartIndex, 
      endIndex: newEndIndex 
    });

    populateRecipes();
  } 
}));
