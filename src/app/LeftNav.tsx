import { ChevronLeft, OpenInBrowser, Search } from "@mui/icons-material";
import {
    Box,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
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
const LeftNav: React.FC<NavProps> = ({ open, setOpen }) => (
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
                <Typography>Filters</Typography>
                <IconButton onClick={() => setOpen(false)}>
                    <ChevronLeft />
                </IconButton>
            </Stack>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
            <List>
                {["Open SHD Prerelease Kit"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <OpenInBrowser />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                    <FormControl variant="standard">
                        <Input
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </ListItem>
            </List>
            <Divider />
        </Box>
    </Drawer>
);

export default LeftNav;
