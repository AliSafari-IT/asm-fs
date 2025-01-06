import tinycolor from 'tinycolor2';

// Function to resolve CSS variable value
const resolveCSSVariable = (color: string): string => {
  if (color.startsWith('var(')) {
    const cssVariable = color.slice(4, -1).trim(); // Extract variable name
    const computedStyle = getComputedStyle(document.documentElement);
    const resolvedColor = computedStyle.getPropertyValue(cssVariable).trim();

    if (resolvedColor) {
      return resolvedColor;
    } else {
      console.warn(`CSS variable ${cssVariable} is not defined or has an invalid value.`);
      return '#000000'; // Fallback to black if the variable is not defined
    }
  }
  return color; // If not a CSS variable, return as is
};

const determineTextColor = (currentTheme: string, bgColor: string): string => {
  // Resolve CSS variable if applicable
  const resolvedColor = resolveCSSVariable(bgColor);

  // Ensure `resolvedColor` is a valid color
  const parsedColor = tinycolor(resolvedColor);
  // Define the primary text colors for light and dark themes
  const lightTextColor = 'darkblue'; // Black
  const darkTextColor = 'lightblue'; // White

  if (!parsedColor.isValid()) {
    console.warn(`Invalid background color provided: ${bgColor}`);
    return currentTheme === 'dark' ? darkTextColor : lightTextColor; // Fallback to default theme colors
  }

  // Choose a default text color based on the current theme
  const defaultTextColor = currentTheme === 'dark' ? darkTextColor : lightTextColor;

  // Calculate the contrast ratio between the background and the default text color
  const contrastRatio = tinycolor.readability(resolvedColor, defaultTextColor);
  //console.log('Contrast Ratio:', contrastRatio);
  // Minimum contrast ratio for WCAG AA standards
  const minContrast = 4.5;

  // If contrast ratio meets standards, return the default color
  if (contrastRatio >= minContrast) {
    return defaultTextColor;
  }

  // If the contrast is insufficient, calculate the most readable color
  const fallbackTextColor = tinycolor.mostReadable(resolvedColor, [lightTextColor, darkTextColor], {
    includeFallbackColors: true,
    level: 'AAA',
    size: 'large',
  });

  return fallbackTextColor.toHexString();
};

export default determineTextColor;
