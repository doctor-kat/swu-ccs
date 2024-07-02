"use client";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import theme from "./theme";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <Analytics />
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
