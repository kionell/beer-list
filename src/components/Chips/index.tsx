import { Chip, ChipProps }  from '../Chip'
import './index.css';

interface ChipsProps {
  title?: string;
  items: ChipProps[];
}

export const Chips: React.FC<ChipsProps> = ({ title, items }) => {
  return (
    <div className='chips__container'>
      { 
        title && <h4 className='chips__title'>{title}</h4>
      }
      <div className='chips__content'>
        {
          items.map((item) => (
            <Chip 
              key={`${item.title}-${item.content}`}
              title={item.title}
              content={item.content}
            />
          ))
        }
      </div>
    </div>
  );
}
