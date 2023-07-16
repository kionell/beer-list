import { UnitValue } from "../interfaces/UnitValue";

type ValueType = number | string | null;

/**
 * Converts unit value object to a string.
 * @param value Unit value object.
 * @param space Space between value and unit.
 * @returns Stringified unit value.
 */
export function stringifyUnitValue(
  value: UnitValue,
  space?: boolean,
): string;

/**
 * Converts value and unit to a string.
 * @param value The value or null.
 * @param unit The unit.
 * @param space Space between value and unit.
 * @returns Stringified unit value.
 */
export function stringifyUnitValue(
  value: ValueType, 
  unit?: string,
  space?: boolean,
): string;

export function stringifyUnitValue(
  value: UnitValue | ValueType, 
  unitOrSpace?: string | boolean,
  space = false,
) {
  if (value === null) {
    return 'Unknown';
  }

  if (typeof value === 'number' && typeof unitOrSpace === 'string') {
    const delimiter = space ? ' ' : '';
    
    return `${value}${delimiter}${unitOrSpace}`;
  }

  const unitValue = value as UnitValue;

  if (unitValue?.unit && typeof unitValue?.value === 'number') {
    const delimiter = unitOrSpace ? ' ' : '';
    
    return `${unitValue.value}${delimiter}${unitValue.unit}`;
  }

  return `${value as NonNullable<ValueType>}`;
}
