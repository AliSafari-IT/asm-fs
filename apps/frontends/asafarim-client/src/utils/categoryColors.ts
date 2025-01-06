import determineTextColor from "./determineTextColor";
import { getTheme } from "./themeUtils";

// E:\asm-fs\apps\frontends\asafarim-client\src\utils\categoryColors.ts
export const allPalettes = {
    primary: {
        color: "--ts-pallette-Primary",
        bgColor: "--ts-pallette-bgPrimary"
    },
    secondary: {
        color: "--ts-pallette-Secondary",
        bgColor: "--ts-pallette-bgSecondary"
    },
    blue: {
        color: "--ts-pallette-Blue",
        bgColor: "--ts-pallette-bgBlue"
    },
    gold: {
        color: "--ts-pallette-Gold",
        bgColor: "--ts-pallette-bgGold"
    },
    success: {
        color: "--ts-pallette-Success",
        bgColor: "--ts-pallette-bgSuccess"
    },
    warning: {
        color: "--ts-pallette-Warning",
        bgColor: "--ts-pallette-bgWarning"
    },
    danger: {
        color: "--ts-pallette-Danger",
        bgColor: "--ts-pallette-bgDanger"
    },
    info: {
        color: "--ts-pallette-Info",
        bgColor: "--ts-pallette-bgInfo"
    },
    default: {
        color: "--ts-pallette-Default",
        bgColor: "--ts-pallette-bgDefault"
    },
    googlePrimary: {
        color: "--ts-pallette-googlePrimary",
        bgColor: "--ts-pallette-bgGooglePrimary"
    },
    googleSecondary: {
        color: "--ts-pallette-googleSecondary",
        bgColor: "--ts-pallette-bgGoogleSecondary"
    },
    googleDefault: {
        color: "--ts-pallette-googleDefault",
        bgColor: "--ts-pallette-bgGoogleDefault"
    },
    googleSuccess: {
        color: "--ts-pallette-googleSuccess",
        bgColor: "--ts-pallette-bgGoogleSuccess"
    },
    googleWarning: {
        color: "--ts-pallette-googleWarning",
        bgColor: "--ts-pallette-bgGoogleWarning"
    },
    googleDanger: {
        color: "--ts-pallette-googleDanger",
        bgColor: "--ts-pallette-bgGoogleDanger"
    },
    googleInfo: {
        color: "--ts-pallette-googleInfo",
        bgColor: "--ts-pallette-bgGoogleInfo"
    }
};

const generateCategoryColors = (categories: string[]): Record<string, { color: string; textColor: string; categories: string[] }> => {
    const rootStyles = getComputedStyle(document.documentElement);
    const selectedPalette = allPalettes.googlePrimary;
    const backgroundColors = rootStyles.getPropertyValue(selectedPalette.bgColor).split(",");
    const foregroundColors = rootStyles.getPropertyValue(selectedPalette.color).split(",");
    const currentTheme = getTheme();

    const categoryColors: Record<string, { color: string; textColor: string; categories: string[] }> = {};
    categories.forEach((category, index) => {
        const bgColor = backgroundColors[index % backgroundColors.length].trim();
        categoryColors[category] = {
            color: bgColor,
            textColor: determineTextColor(currentTheme, bgColor),
            categories: [category],
        };
    });

    // Assign a default color in case a category is not found
    categoryColors.default = {
        color: backgroundColors[0].trim(),
        textColor: foregroundColors[0].trim(),
        categories: ["default"]
    };

    return categoryColors;
};

export default generateCategoryColors