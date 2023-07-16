import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { BeerRecipe } from "../../interfaces/BeerRecipe";
import { BeerCard } from '../BeerCard';
import { BeerCardSkeleton } from '../BeerCardSkeleton';
import { useRecipeStore } from '../../api/store';

interface BeerListItemProps {
  recipe: BeerRecipe;
  index: number;
  onClick?: (recipe: BeerRecipe) => void;
  onToggleSelect?: (recipe: BeerRecipe) => void;
}

export const BeerListItem: React.FC<BeerListItemProps> = (props) => {
  const { 
    startIndex, 
    endIndex, 
    moveBackward, 
    moveForward 
  } = useRecipeStore();

  /**
   * There are two possible options for infinite scrolling:
   * 1) When triggerOnce is `true` we can only scroll to 
   * the bottom as all previous elements are being deleted.
   * This also saves a lot of internet traffic because of lazy loading.
   * 2) When triggerOnce is `false` we can scroll to the top
   * since all deleted cards are reloaded.
   */
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!inView) return;

    if (props.index + startIndex <= startIndex) {
      moveBackward();
    }

    if (props.index + startIndex >= endIndex) {
      moveForward();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className='beer-list__item' ref={ref}>
      { inView ? <BeerCard {...props} /> : <BeerCardSkeleton /> }
    </div>
  );
}
