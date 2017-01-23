import electron from 'electron';

const SIZES = [
  { width: 1600, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 578 }
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
  let factor = _factor;
  if (factor > 1.25) factor = 1.25;
  if (factor < 0.75) factor = 0.75;
  return factor;
}

export function getScaleFactor (width) {
  const factor = computeScaleFactor(width);
  return clampScaleFactor(factor);
}

export function getInitialWindowDimensions () {
  const primaryDisplay = electron.screen.getPrimaryDisplay();
  const workAreaWidth = primaryDisplay.workAreaSize.width;
  const finalDimensions = SIZES.reduce((prev, curr) => {
    if (Math.abs(curr.width - workAreaWidth) < Math.abs(prev.width - workAreaWidth)) {
      return curr;
    }
    return prev;
  });
  return {
    dimensions: finalDimensions,
    scale: getScaleFactor(finalDimensions.width)
  };
}
