import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { RecipeDetails } from './pages/RecipeDetails';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/:recipeId' element={<RecipeDetails />} /> 
      </Routes>
    </BrowserRouter>
  );
}
