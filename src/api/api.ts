import { BeerRecipe } from "../interfaces/BeerRecipe";
import { ErrorResponse } from "../interfaces/ErrorResponse";

interface APIResponse<T> {
  statusCode: number;
  error: T extends null ? string : null;
  data: T extends null ? null : T; 
}

/**
 * Makes an abstract request to the URL and tries to fetch data.
 * @param url The URL to which the request should be made.
 * @returns Fetched data.
 */
async function makeRequest<T>(url: URL): Promise<APIResponse<T | null>> {
  try {    
    const response = await fetch(url);

    if (!response.ok) {
      throw await response.json();
    }

    const data = await response.json() as T;

    return {
      statusCode: response.status,
      error: null,
      data,
    } as APIResponse<T>;
  }
  catch (err: unknown) {
    const response = err as ErrorResponse;

    return {
      statusCode: response?.statusCode ?? 500,
      error: response?.message ?? 'Something went wrong...',
      data: null,
    } as APIResponse<null>; 
  }
}

/**
 * Fetches all available beer recipes from the API using pagination.
 * @param page Current page.
 * @param limit Recipes per page.
 * @returns Fetched list of beer recipes.
 */
export async function fetchRecipes(
  page = 1,
  limit = Number(import.meta.env.VITE_BEERS_PER_PAGE) + 10,
) {
  const url = new URL(import.meta.env.VITE_API_URL);

  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', limit.toString());

  return makeRequest<BeerRecipe[]>(url);
}

/**
 * Fetches a single beer recipe from the API by its ID.
 * @param id Recipe ID.
 * @throws If beer recipe can't be fetched.
 * @returns Fetched beer recipe.
 */
export async function fetchRecipe(id: number) {  
  const url = new URL(import.meta.env.VITE_API_URL);

  url.pathname += `/${id}`;

  return makeRequest<BeerRecipe[]>(url);
}
