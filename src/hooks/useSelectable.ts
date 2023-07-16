import { useRef, RefObject } from "react";
import { useEffectOnce } from "react-use";
import { isRightButton, isTouchEvent } from "../utils/events";

const useSelectable = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  onToggleSelect?: () => void,
) => {
  const timeout = useRef<number>();
  const target = useRef<T>();

  const makeSelectable = (element: T) => {
    const toggleSelected = () => {
      element.classList.toggle('selected');
  
      if (onToggleSelect) onToggleSelect();
    };
  
    const preventDefault = (event: Event) => {
      if (!isTouchEvent(event)) {
        return event.preventDefault();
      }
    
      const touchEvent = event as TouchEvent;
    
      if (touchEvent.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
      }
    }

    const removeMouseListeners = () => {
      element.removeEventListener('mouseup', onMouseUp);
      element.removeEventListener('mouseleave', onMouseLeave);
    } 

    const onMouseUp = () => {
      removeMouseListeners();
      toggleSelected();
    }

    const onMouseLeave = () => removeMouseListeners();

    const onMouseDown = (event: Event) => {
      if (!isRightButton(event)) return;

      element.addEventListener('mouseup', onMouseUp);
      element.addEventListener('mouseleave', onMouseLeave);
    }

    const onTouchStart = () => {
      element.addEventListener('touchend', preventDefault, {
        passive: false,
      });
  
      target.current = element;
      timeout.current = setTimeout(() => toggleSelected(), 500);
    };

    const onTouchEnd = () => {
      timeout.current && clearTimeout(timeout.current);
  
      if (target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    }

    element.addEventListener('contextmenu', preventDefault);
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchend', onTouchEnd);
    
    return () => {
      element.removeEventListener('contextmenu', preventDefault);
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }

  useEffectOnce(() => {
    if (ref instanceof Function || !ref?.current) return;

    return makeSelectable(ref.current);
  });
};

export { useSelectable };
