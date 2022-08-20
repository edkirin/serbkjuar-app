import { createTheme } from "@mui/material";

const PRIMARY_COLOR = "#0d6efd";
const SECONDARY_COLOR = "#6c757d";
const SUCCESS_COLOR = "#198754";
const ERROR_COLOR = "#dc3545";
const INFO_COLOR = "#0dcaf0";
const WARNING_COLOR = "#ffc107";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: PRIMARY_COLOR,
            contrastText: "#FFF",
        },
        secondary: {
            main: SECONDARY_COLOR,
            contrastText: "#FFF",
        },
        success: {
            main: SUCCESS_COLOR,
            contrastText: "#FFF",
        },
        error: {
            main: ERROR_COLOR,
            contrastText: "#FFF",
        },
        info: {
            main: INFO_COLOR,
            contrastText: "#000",
        },
        warning: {
            main: WARNING_COLOR,
            contrastText: "#000",
        },
    },
    typography: {
        h1: {
            fontSize: "2.7rem",
        },
        h2: {
            fontSize: "2.4rem",
        },
        h3: {
            fontSize: "2.1rem",
        },
        h4: {
            fontSize: "1.8rem",
        },
        h5: {
            fontSize: "1.5rem",
        },
        h6: {
            fontSize: "1.2rem",
        },
        body: {
            fontSize: "1rem",
        },
    },
});
