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
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type NavProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};
const RightNav: React.FC<NavProps> = ({ open, setOpen }) => (
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
                        onClick={() => /*setModalOpen(true)*/ {}}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <CopyAll />
                            </ListItemIcon>
                            <ListItemText primary="Export" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Box>
        </Drawer>
        {/*<Dialog open={modalOpen} onClose={() => setModalOpen(false)}>*/}
        {/*    <Box sx={{ p: 2 }}>*/}
        {/*        <Typography>*/}
        {/*            /!*{JSON.stringify(swuCardsToSWUDBDeck(booster))}*!/*/}
        {/*        </Typography>*/}
        {/*    </Box>*/}
        {/*</Dialog>*/}
    </>
);
export default RightNav;
