import { UnitValue } from "./UnitValue";

export interface BeerMalt {
  name: string;
  amount: UnitValue;
}

export interface BeerHops {
  add: string;
  amount: UnitValue;
  attribute: string;
  name: string;
}

export interface BeerIngredients {
  malt: BeerMalt[];
  hops: BeerHops[]; 
  yeast: string;
}

export interface BeerMashTemp {
  duration: number;
  temp: UnitValue;
}

export interface BeerFermentation {
  temp: UnitValue;
}

export interface BeerMethod {
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
