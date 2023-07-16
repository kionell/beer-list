import './index.css';

export const BeerCardSkeleton: React.FC = () => {
  return (
    <div className='card-skeleton'>
      <div className='card-skeleton__image card-skeleton__item' />
      <div className='card-skeleton__content'>
        <span className='card-skeleton__name card-skeleton__item' />
        <div className='card-skeleton__description'>
          <span className='card-skeleton__text card-skeleton__item' />
          <span className='card-skeleton__text card-skeleton__item' />
          <span className='card-skeleton__text card-skeleton__item' />
          <span className='card-skeleton__text card-skeleton__item' />
        </div>
        <div className='card-skeleton__details skeleton-details'>
          <div className='skeleton-details__stats'>
            <span className='card-skeleton__stat card-skeleton__item' />
            <span className='card-skeleton__stat card-skeleton__item' />
            <span className='card-skeleton__stat card-skeleton__item' />
          </div>
          <div className='skeleton-details__date'>
            <span className='card-skeleton__date card-skeleton__item' />
          </div>
        </div>
      </div>
    </div>
  );
}
