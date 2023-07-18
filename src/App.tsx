import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BeerCatalog } from "./pages/BeerCatalog";
import { RecipeDetails } from './pages/RecipeDetails';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BeerCatalog />} /> 
        <Route path='/beers/:recipeId' element={<RecipeDetails />} /> 
      </Routes>
    </BrowserRouter>
  );
}
