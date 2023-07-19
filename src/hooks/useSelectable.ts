import { useRef, useEffect, useState, useCallback } from "react";
import { isRightButton, isTouchEvent } from "../utils/events";
import { useRecipeStore } from "../services/store";

const useSelectable = <T extends Element = Element>(
  onToggleSelect?: () => void,
) => {
  const [ref, setRef] = useState<Element | null>(null);
  const { hasSelected } = useRecipeStore();

  const timeout = useRef<number>();

  const makeSelectable = useCallback((element: T) => {
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
    };

    const onTouchOrClick = (event: Event) => {
      if (!hasSelected) return;
      
      event.stopImmediatePropagation();
      
      onPointerUp();
    };

    const onPointerUp = () => {      
      removeReleaseEventListeners();
      toggleSelected();
    };

    const onPointerLeave = () => {
      removeReleaseEventListeners();
    };

    const onMouseDown = (event: Event) => {
      if (!isRightButton(event)) return;

      element.addEventListener('mouseup', onPointerUp);
      element.addEventListener('mouseleave', onPointerLeave);
    }

    const onTouchStart = () => {
      timeout.current = setTimeout(() => toggleSelected(), 500);

      element.addEventListener('touchmove', onPointerLeave);
    };

    const removeReleaseEventListeners = () => {
      timeout.current && clearTimeout(timeout.current);

      element.removeEventListener('mouseup', onPointerUp);
      element.removeEventListener('mouseleave', onPointerLeave);
      element.removeEventListener('touchmove', onPointerLeave);
    };

    element.addEventListener('click', onTouchOrClick);
    element.addEventListener('contextmenu', preventDefault);
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onPointerLeave);
    
    return () => {
      element.removeEventListener('click', onTouchOrClick);
      element.removeEventListener('contextmenu', preventDefault);
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('touchstart', onTouchStart);

      removeReleaseEventListeners();
    };
  }, [onToggleSelect, hasSelected]);

  useEffect(() => {
    if (!ref) return;

    return makeSelectable(ref as T);
  }, [ref, makeSelectable]);

  return { ref: setRef };
};

export { useSelectable };
