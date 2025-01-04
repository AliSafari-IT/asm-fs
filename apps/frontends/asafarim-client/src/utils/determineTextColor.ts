import tinycolor from 'tinycolor2';

const determineTextColor = (bgColor: string): string => {
  // Ensure `bgColor` is a valid color
  const parsedColor = tinycolor(bgColor);

  // Check if the color is valid
  if (!parsedColor.isValid()) {
    console.warn(`Invalid background color provided: ${bgColor}`);
    return 'var(--text-primary)'; // Default fallback
  }

  // Use `tinycolor.mostReadable` to calculate the most readable text color
  const readableColor = tinycolor.mostReadable(bgColor, ['#ffffff', '#000000'], {
    includeFallbackColors: true,
    level: 'AA', // WCAG AA standard
    size: 'large',
  });

  // Return the most readable color
  return readableColor.toHexString();
};

export default determineTextColor;
