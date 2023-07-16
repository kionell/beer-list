import { create } from "zustand";
import { BeerRecipe } from "../interfaces/BeerRecipe";
import { fetchRecipe, fetchRecipes } from "./api";

interface RecipeListState {
  /**
   * The list of beer recipes that will be rendered on a screen.
   */
  recipes: BeerRecipe[];

  /**
   * The list of additional beer recipes.
   * This will be used in case if user decides to delete one or more entries.
   */
  extraRecipes: BeerRecipe[];

  /**
   * Current page for fetching data from the API.
   */
  currentPage: number;

  /**
   * Tries to find a cached recipe by its ID.
   * Otherwise tries to fetch it from the API.
   * @param id Recipe ID.
   * @throws If recipe was not found.
   * @returns Found recipe.
   */
  getRecipeById: (id: number) => Promise<BeerRecipe>;
  
  /**
   * Deletes one or more beer recipe from {@link recipes} list and 
   * replaces it with recipes from {@link extraRecipes} list.
   * Performs an extra fetch if there are not enough recipes in {@link extraRecipes}.
   * @param ids The list of IDs of all beer recipes that should be deleted.
   */
  deleteRecipes: (ids: number[]) => Promise<void>;

  /**
   * Fetches beer recipes from the API using {@link fetchRecipes} and 
   * adds them to {@link recipes} and {@link extraRecipes} lists.
   */
  populateRecipes: () => Promise<void>;
}

export const useRecipeStore = create<RecipeListState>((set, get) => ({
  recipes: [],
  extraRecipes: [],
  currentPage: 1,

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
    const { recipes, extraRecipes, currentPage } = get();
    const BEERS_PER_PAGE = Number(import.meta.env.VITE_BEERS_PER_PAGE);

    const newRecipes = recipes.filter((r) => !ids.includes(r.id));
    const newExtraRecipes = [...extraRecipes];

    let newPage = currentPage;

    while (newRecipes.length < BEERS_PER_PAGE) {
      const remainingRecipes = BEERS_PER_PAGE - newRecipes.length;

      if (newExtraRecipes.length < remainingRecipes) {
        /**
         * We want to increment current page only 
         * when there are not enough extra recipes.
         * This is done to prevent unwanted side effects
         * from multiple component mounts.
         */
        const fetchedRecipes = await fetchRecipes(++newPage);
        
        if (!fetchedRecipes.data && fetchedRecipes.error) {
          throw new Error(fetchedRecipes.error);
        }

        newExtraRecipes.push(...fetchedRecipes.data as BeerRecipe[]);
      }

      newRecipes.push(...newExtraRecipes.splice(0, remainingRecipes));
    }

    set({ 
      recipes: newRecipes, 
      extraRecipes: newExtraRecipes,
      currentPage: newPage,
    });
  },

  async populateRecipes() {
    const { recipes, extraRecipes, currentPage } = get();
    const BEERS_PER_PAGE = Number(import.meta.env.VITE_BEERS_PER_PAGE);

    const totalRecipes = recipes.length + extraRecipes.length;

    if (totalRecipes >= BEERS_PER_PAGE) return;

    const fetchedRecipes = await fetchRecipes(currentPage);

    if (!fetchedRecipes.data && fetchedRecipes.error) {
      throw new Error(fetchedRecipes.error);
    }

    const data = fetchedRecipes.data as BeerRecipe[];

    set({
      recipes: data.slice(0, BEERS_PER_PAGE),
      extraRecipes: data.slice(BEERS_PER_PAGE),
    });
  },
}));