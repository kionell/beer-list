/**
 * Calculates absolute height of the element 
 * including borders, paddings and margins.
 * @param element The element.
 * @returns The absolute height.
 */
export function calculateAbsoluteHeight(element: Element): number {
  const height = element.getBoundingClientRect().height;
  const style = window.getComputedStyle(element);

  return [style.marginTop, style.marginBottom]
    .map((margin) => parseInt(margin, 10))
    .reduce((total, side) => total + side, height);
}
