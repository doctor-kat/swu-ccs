import { swuCardsToSWUDBDeck } from "@/app/api/booster/swudb";
import { Card } from "@/types/card/Card";
import { CopyAll, OpenInBrowser } from "@mui/icons-material";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Toolbar,
} from "@mui/material";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

type NavProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    cards: Card[];
};
export const DRAWER_WIDTH_CLOSED = 84;
export const DRAWER_WIDTH_OPEN = 240;
const LeftNav: React.FC<NavProps> = ({ open, setOpen, cards }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
                flexShrink: 0,
            }}
            PaperProps={{
                elevation: 12,
                sx: {
                    width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
                    boxSizing: "border-box",
                    overflow: "hidden",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: open ? "auto" : "hidden" }}>
                <List>
                    {["SOR", "SHD", "TWI"].map((set) => (
                        <ListItem key={set}>
                            <a href={`/?set=${set}&count=6`}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <OpenInBrowser />
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText
                                            primary={`Open ${set} Prerelease Kit`}
                                        />
                                    )}
                                </ListItemButton>
                            </a>
                        </ListItem>
                    ))}
                    <Divider />
                    <a href="https://www.swudb.com/decks" target="_blank">
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Image
                                        src="/swudb.png"
                                        alt="swudb"
                                        height={24}
                                        width={24}
                                    />
                                </ListItemIcon>
                                {open && <ListItemText primary="swudb.com" />}
                            </ListItemButton>
                        </ListItem>
                    </a>
                    <ListItem
                        onClick={() => {
                            navigator.clipboard
                                .writeText(
                                    JSON.stringify(swuCardsToSWUDBDeck(cards)),
                                )
                                .then(() => {
                                    setSnackbarOpen(true);
                                });
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <CopyAll />
                            </ListItemIcon>
                            {open && (
                                <ListItemText primary="Copy .json for SWUDB" />
                            )}
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                message="Text copied to clipboard"
            />
        </Drawer>
    );
};

export default LeftNav;
