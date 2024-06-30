"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        mode: "light",
        primary: {
            main: "#66d9ef",
        },
        secondary: {
            main: "#9e86c8",
        },
        background: {
            default: "#2e2e2e",
            paper: "#2e2e2e",
        },
        text: {
            primary: "#d6d6d6",
            secondary: "#e5b567",
            disabled: "#797979",
        },
        error: {
            main: "#b05279",
        },
        success: {
            main: "#b4d273",
        },
        warning: {
            main: "#e87d3e",
        },
        info: {
            main: "#6c99bb",
        },
    },
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    position: "sticky",
                    top: 63,
                    background: "#2e2e2e",
                },
            },
        },
    },
});

export default theme;
