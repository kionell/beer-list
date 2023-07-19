import { useMemo } from 'react'
import { InfoCard } from '../InfoCard'
import { BeerMashTemp, BeerFermentation } from '../../interfaces/BeerRecipe';
import { TemperatureIcon } from '../Icon';
import './index.css';

interface TemperatureCardProps {
  title: string;
  temperatures: (BeerMashTemp | BeerFermentation)[];
  className: string;
}

export const TemperatureCard: React.FC<TemperatureCardProps> = ({ 
  title, 
  temperatures, 
  className 
}) => {
  const cards = useMemo(() => {
    return temperatures.map((temperature) => {
      const { temp } = temperature;
      
      const mashTemp = temperature as BeerMashTemp;
      const unitChar = temp.unit[0].toUpperCase()
      const duration = mashTemp.duration ? ` for ${mashTemp.duration} minutes` : '';
      
      return (
        <InfoCard
          className='temperature-card__content'
          key={`${temp.value}-${unitChar}-${duration}`}
          icon={() => <TemperatureIcon size={30} />}
        >
          <span>{temp.value}°{unitChar}{duration}</span>
        </InfoCard>
      );
    });
  }, [temperatures]);

  return (
    <div className={`${['temperature-card__container', className].join(' ')}`}>
      <h3 className='temperature-card__title'>{title}</h3>
      {
        cards 
      }
    </div>
  )
}