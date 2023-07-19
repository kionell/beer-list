import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecipeStore } from '../../services/store';
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import { BeerCard } from '../BeerCard';
import { BeerCardSkeleton } from '../BeerCardSkeleton';
import { calculateAbsoluteHeight } from '../../utils/css';
import './index.css';

interface BeerCatalogItemProps {
  recipe: BeerRecipe;
  index: number;
  onClick?: (recipe: BeerRecipe) => void;
  onToggleSelect?: (recipe: BeerRecipe) => void;
}

export const BeerCatalogItem: React.FC<BeerCatalogItemProps> = (props) => {
  const { 
    startIndex, 
    endIndex, 
    moveForward,
    setRecipeLimit,
  } = useRecipeStore();

  /**
   * There are two possible options for infinite scrolling:
   * 1) When triggerOnce is `true` we can only scroll to 
   * the bottom as all previous elements are being deleted.
   * This also saves a lot of internet traffic because of lazy loading.
   * 2) When triggerOnce is `false` we can scroll to the top
   * since all deleted cards are reloaded.
   */
  const { ref, inView, entry } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!inView || !entry) return;

    if (props.index + startIndex >= endIndex) {
      const itemHeight = calculateAbsoluteHeight(entry.target);
      const totalHeight = (endIndex - startIndex) * itemHeight;
      
      /**
       * Starting viewport height greater than total height 
       * of all cards can result in endless request spam 
       * since the number of items on the screen is always the same.
       * We can update the limit of rendered items to fix the problem.
       */
      if (window.innerHeight > totalHeight) {
        const newLimit = Math.ceil(window.innerHeight / itemHeight) + 5;

        setRecipeLimit(newLimit);

        if (window.scrollY === 0) return;
      }

      const ITEMS_PER_PAGE = Number(import.meta.env.VITE_BEERS_PER_PAGE);

      if (window.innerHeight < (ITEMS_PER_PAGE - 1) * itemHeight) {
        setRecipeLimit();
      }

      return moveForward();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className='beer-catalog__item' ref={ref}>
      { inView ? <BeerCard {...props} /> : <BeerCardSkeleton /> }
    </div>
  );
}
