export function isTouchEvent(event: Event) {
  return 'touches' in event;
}

export function isRightButton(event: Event) {
  return 'button' in event && event.button === 2;
}
