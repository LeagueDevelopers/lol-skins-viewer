import electron from 'electron';

export const MIN_FACTOR = 0.8;
export const MAX_FACTOR = 1.25;

export const SIZES = [
  { width: 1600, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 576 }
];

export function computeScaleFactor (width) {
  return Math.floor((width / 1280) * 100) / 100;
}

export function getSize (factor) {
  return {
    width: 1280 * factor,
    height: 720 * factor
  };
}

export function clampScaleFactor (_factor) {
  let factor = Number(_factor);
  if (factor > MAX_FACTOR) factor = MAX_FACTOR;
  if (factor < MIN_FACTOR) factor = MIN_FACTOR;
  return factor;
}

export function getScaleFactor (width) {
  const factor = computeScaleFactor(width);
  return clampScaleFactor(factor);
}

export function getInitialWindowDimensions () {
  const primaryDisplay = electron.screen.getPrimaryDisplay();
  const workAreaWidth = primaryDisplay.workAreaSize.width;
  const workAreaHeight = primaryDisplay.workAreaSize.height;
  const finalDimensions = SIZES.reduceRight((prev, curr) => {
    // if it fits the screen, use this size
    if (workAreaWidth - curr.width > 0) {
      return curr;
    }
    // otherwise take the previous size that did fit
    return prev;
  }, { width: workAreaWidth, height: workAreaHeight });
  return {
    dimensions: finalDimensions,
    scale: getScaleFactor(finalDimensions.width)
  };
}
