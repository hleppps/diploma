import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

interface CustomColors {
  white: string;
  black: string;
  graphite: string;
  grey: string;
  greyLight: string;
  greyBlue: string;
  greyLightBlue: string;
  greyBackground: string;
  blue: string;
  blueLight: string;
  green: string;
  yellow: string;
  red: string;
  gold: string;
  brown: string;
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom: CustomColors;
  }

  interface PaletteOptions {
    custom?: CustomColors;
  }
}

export const basicTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1200,
      desktop: 1680,
    },
  },

});

export const theme = createTheme(
  basicTheme
);
