import { TemperatureCard } from '../TemperatureCard';
import { BeerMethod } from '../../interfaces/BeerRecipe';
import './index.css';

export const Method: React.FC<BeerMethod> = ({ fermentation, mash_temp }) => {  
  return (
    <div className='method__container'>
      { 
        mash_temp && <TemperatureCard
          title='Mash Temperature'
          temperatures={mash_temp}
          className='method__temperature' 
        />
      }
      { 
        fermentation && <TemperatureCard
          title='Fermentation Temperature'
          temperatures={[fermentation]}
          className='method__temperature' 
        /> 
      }
    </div>
  )
}