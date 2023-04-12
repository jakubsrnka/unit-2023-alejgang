/**
 * Gap interface for use in CSS
 */
export interface Gap {
  column?: string;
  row?: string;
}

/**
 * Default gap to be parsed into CSS as a variable using @function parseGap()
 */
export const DefaultGap = {
  column: '0',
  row: '0'
};
/**
 * parses @param gap for usage into CSS / SCSS as a variable directly
 * @param {string | Gap} gap - gap to be parsed into a string
 * @param {Gap} defaultGap - default gap properties if some properties of @param gap are omitted, defaults to @const DefaultGap
 * @returns parsed fap to be directly used inside CSS
 */
export function parseGap(gap: string | Gap, defaultGap: Gap = DefaultGap): string {
  if (typeof gap === 'object') {
    gap = {
      ...defaultGap,
      ...gap
    };
    return `${gap.row} ${gap.column}`;
  }
  return gap;
}

/**
 * Default interface for all four cardinal directions
 */
export interface Directions {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

/**
 * Margin interface for use in CSS
 */
export type Margin = Directions;

/**
 * Default margin to be parsed into CSS as a variable using @function parseMargin()
 */
export const DefaultMargin: Margin = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0'
};

/**
 * parses @param margin for usage into CSS / SCSS as a variable directly
 * @param {string | Margin} margin - margin to be parsed into a string
 * @param {Margin} defaultMargin - default margins to include if some properties of @param margin are omitted, defaults to @const DefaultMargin
 * @returns parsed margin to be directly used inside CSS
 */
export function parseMargin(
  margin: string | Margin,
  defaultMargin: Margin = DefaultMargin
): string {
  if (typeof margin === 'object') {
    margin = {
      ...defaultMargin,
      ...margin
    };
    return `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`;
  }
  return margin;
}

/**
 * Margin interface for use in CSS
 */
export type Padding = Directions;

/**
 * Default margin to be parsed into CSS as a variable using @function parseMargin()
 */
export const DefaultPadding: Padding = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0'
};

/**
 * parses @param padding for usage into CSS / SCSS as a variable directly
 * @param {string | Padding} padding - padding to be parsed into a string
 * @param {Padding} defaultPadding - default paddings to include if some properties of @param padding are omitted, defaults to @const DefaultPadding
 * @returns parsed padding to be directly used inside CSS
 */
export function parsePadding(
  padding: string | Padding,
  defaultPadding: Padding = DefaultPadding
): string {
  if (typeof padding === 'object') {
    padding = {
      ...defaultPadding,
      ...padding
    };
    return `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`;
  }
  return padding;
}
