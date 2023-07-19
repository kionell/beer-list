import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BeerCatalog } from "./pages/BeerCatalog";
import { BeerDetails } from './pages/BeerDetails';
import { NotFound } from './pages/NotFound';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BeerCatalog />} /> 
        <Route path='/beers/:id' element={<BeerDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
