import { createTheme, lighten } from "@mui/material/styles";
import { spartan400, spartan500, spartan600, spartan700 } from "./fonts";

// ## Colors
// ### Primary

const desaturatedDarkCyan = "hsl(180, 29%, 50%)";

// ### Neutral

const lightGrayishCyanBg = "hsl(180, 52%, 96%)"; // Background
const lightGrayishCyanFt = "hsl(180, 31%, 95%)"; // Filter Tablets
const darkGrayishCyan = "hsl(180, 8%, 52%)";
const veryDarkGrayishCyan = "hsl(180, 14%, 20%)";

const boxShadow =
  "0px 6px 6px -3px hsla(180, 29%, 50%, 0.07), 0px 10px 14px 1px rgba(91, 164, 164, 0.07), 0px 4px 18px 3px rgba(91, 164, 164, 0.07)";

const theme = createTheme({});

const customizedTheme = createTheme({
  typography: {
    fontFamily: "Spartan",
    h6: {
      fontSize: ".95rem",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Spartan",
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: desaturatedDarkCyan,
    },
    neutral: {
      lightGrayishCyanBg: lightGrayishCyanBg,
      lightGrayishCyanFt: lightGrayishCyanFt,
      darkGrayishCyan: darkGrayishCyan,
      veryDarkGrayishCyan: veryDarkGrayishCyan,
    },
    divider: lighten(darkGrayishCyan, 0.5),
  },
  shadows: theme.shadows.map((shadow, index) => {
    return index === 10 ? boxShadow : shadow;
  }),
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [spartan400, spartan500, spartan600, spartan700],
        body: {
          fontFamily: "Spartan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },
    MuiContainer: {
      root: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      maxWidthLg: {
        [theme.breakpoints.up("lg")]: {
          maxWidth: 1200,
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
    MuiChip: {
      root: {
        fontWeight: "bold",
        fontSize: "0.725rem",
        height: 24,
      },
      colorPrimary: {
        color: "white",
      },
      colorSecondary: {
        backgroundColor: veryDarkGrayishCyan,
        color: "white",
      },
      label: {
        paddingLeft: 8,
        paddingRight: 8,
        transform: "translateY(1.5px)",
      },
    },
  },
});

export default customizedTheme;
