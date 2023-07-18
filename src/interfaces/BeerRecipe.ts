import { UnitValue } from "./UnitValue";

interface BeerMalt {
  name: string;
  amount: UnitValue;
}

interface BeerHops {
  add: 'start' | 'middle' | 'end' | 'dry hop';
  amount: UnitValue;
  attribute: 'bitter' | 'flavour' | 'aroma';
  name: string;
}

interface BeerIngredients {
  malt: BeerMalt[];
  hops: BeerHops[]; 
  yeast: string;
}

interface BeerMashTemp {
  duration: number;
  temp: UnitValue;
}

interface BeerFermentation {
  temp: UnitValue;
}

interface BeerMethod {
  mash_temp: BeerMashTemp[], 
  fermentation: BeerFermentation, 
  twist: string | null;
}

export interface BeerRecipe {
  abv: number; 
  attenuation_level: number;
  boil_volume: UnitValue;
  brewers_tips: string; 
  contributed_by: string;
  description: string;
  ebc: number;
  first_brewed: string;
  food_pairing: string[];
  ibu: number;
  id: number;
  image_url: string;
  ingredients: BeerIngredients,
  method: BeerMethod,
  name: string; 
  ph: number | null;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: UnitValue;
}