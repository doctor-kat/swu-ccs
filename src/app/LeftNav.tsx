import { swuCardsToSWUDBDeck } from "@/app/api/booster/swudb";
import { Card } from "@/types/card/Card";
import {
    ChevronLeft,
    CopyAll,
    OpenInBrowser,
    OpenInNew,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Stack,
    Toolbar,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

type NavProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    cards: Card[];
};
const LeftNav: React.FC<NavProps> = ({ open, setOpen, cards }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 240,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar>
                <Stack
                    width="100%"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeft />
                    </IconButton>
                </Stack>
            </Toolbar>
            <Box sx={{ overflow: "auto" }}>
                <List>
                    <ListItem>
                        <a href="/">
                            <ListItemButton>
                                <ListItemIcon>
                                    <OpenInBrowser />
                                </ListItemIcon>
                                <ListItemText primary="Open SHD Prerelease Kit" />
                            </ListItemButton>
                        </a>
                    </ListItem>
                    <Divider />
                    <a href="https://www.swudb.com/decks" target="_blank">
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <OpenInNew />
                                </ListItemIcon>
                                <ListItemText primary="swudb.com" />
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
                            <ListItemText primary="Copy .json for SWUDB" />
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
