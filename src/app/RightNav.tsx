import { swuCardsToSWUDBDeck } from "@/app/api/booster/swudb";
import { Card } from "@/types/card/Card";
import { ChevronRight, CopyAll } from "@mui/icons-material";
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
    Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

type NavProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    cards: Card[];
};
const RightNav: React.FC<NavProps> = ({ open, setOpen, cards }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return (
        <>
            <Drawer
                variant="persistent"
                open={open}
                anchor="right"
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
                        <Typography>Deck</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <ChevronRight />
                        </IconButton>
                    </Stack>
                </Toolbar>
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>1</ListItemIcon>
                                <ListItemText primary="Leader" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>1</ListItemIcon>
                                <ListItemText primary="Base" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {["Card1", "Card2", "Card3"].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>1</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem
                            disablePadding
                            onClick={() => {
                                navigator.clipboard
                                    .writeText(
                                        JSON.stringify(
                                            swuCardsToSWUDBDeck(cards),
                                        ),
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
                                <ListItemText primary="Export to swudb" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                message="Text copied to clipboard"
            />
        </>
    );
};
export default RightNav;
