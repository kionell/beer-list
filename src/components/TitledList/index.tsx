import './index.css';

interface TitledListProps {
  className: string;
  title: string;
  items: string[];
}

export const TitledList: React.FC<TitledListProps> = ({ 
  className, 
  title, 
  items 
}) => {
  return (
    <div className={['titled-list__container', className].join(' ')}>
      <h4 className='titled-list__title'>{title}</h4>
      <ul className='titled-list__content'>
        {
          items.map((i) => <li className='titled-list__item' key={i}>{i}</li>)
        }
      </ul>
    </div>
  )
}