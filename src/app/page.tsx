"use client";

import { swuCardsToSWUDBDeck } from "@/app/api/booster/swudb";
import { filterCards, getEmptyFilters, getFilters } from "@/app/filter";
import theme from "@/app/theme";
import { Rarity } from "@/types/card/attributes/Rarity";
import type { Card } from "@/types/card/Card";
import {
    ChevronLeft,
    ChevronRight,
    CopyAll,
    MenuOpen,
    OpenInBrowser,
    Search,
} from "@mui/icons-material";
import {
    AppBar,
    Box,
    Checkbox,
    Chip,
    Dialog,
    Divider,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
    const [booster, setBooster] = useState<Card[]>([]);
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [filterGroups, setFilterGroups] = useState(getEmptyFilters());
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/booster?count=6`, {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((booster) => {
                setBooster(booster);
                setFilterGroups(getFilters(booster));
            });
    }, []);

    if (!booster?.length) {
        return "Loading...";
    }

    const cards = filterCards(filterGroups, booster).sort((a, b) => {
        const [aspectA, aspectB] = [a, b].map(
            (card) =>
                card.attributes.aspects.data[
                    card.attributes.aspects.data.length - 1
                ].attributes.name,
        );
        if (aspectA === aspectB) {
            const [rarityA, rarityB] = [a, b].map(
                (card) => card.attributes.rarity.data.attributes.name,
            );
            if (rarityA === rarityB) {
                const [costA, costB] = [a, b].map(
                    (card) => card.attributes.cost,
                );
                return costA - costB;
            } else {
                const rarityOrder = [
                    Rarity.LEGENDARY,
                    Rarity.RARE,
                    Rarity.UNCOMMON,
                    Rarity.COMMON,
                    Rarity.SPECIAL,
                ];
                return (
                    rarityOrder.findIndex((r) => r === rarityA) -
                    rarityOrder.findIndex((r) => r === rarityB)
                );
            }
        } else {
            return aspectA > aspectB ? 1 : -1;
        }
    });
    const drawerWidth = 240;
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar
                    component={Stack}
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
                    >
                        <MenuOpen />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        SWU Cardboard Crack Simulator
                    </Typography>
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setRightDrawerOpen(true)}
                    >
                        <MenuOpen />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={leftDrawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
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
                        <IconButton onClick={() => setLeftDrawerOpen(false)}>
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
            <Box
                component={Paper}
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: `-${drawerWidth}px`,
                    ...(leftDrawerOpen && {
                        transition: theme.transitions.create("margin", {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        marginLeft: 0,
                    }),
                    marginRight: `-${drawerWidth}px`,
                    ...(rightDrawerOpen && {
                        transition: theme.transitions.create("margin", {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        marginRight: 0,
                    }),
                }}
            >
                <Toolbar />
                <Stack gap={2}>
                    <Grid container className="filters" gap={1}>
                        {Object.entries(filterGroups).map(
                            ([label, filters]) => (
                                <Grid item xs key={label}>
                                    <FormControl fullWidth>
                                        <InputLabel>{label}</InputLabel>
                                        <Select
                                            color="primary"
                                            variant="outlined"
                                            multiple
                                            value={filters
                                                .filter((f) => f.active)
                                                .map((f) => f.name)}
                                            input={
                                                <OutlinedInput label="Tag" />
                                            }
                                            onChange={(event) => {
                                                const {
                                                    target: { value },
                                                } = event;
                                                const next = {
                                                    ...filterGroups,
                                                    [label]: filterGroups[
                                                        label
                                                    ].map((f) => ({
                                                        ...f,
                                                        active: (
                                                            value as string[]
                                                        ).includes(f.name),
                                                    })),
                                                };
                                                setFilterGroups(next);
                                            }}
                                            renderValue={(selected) => (
                                                <Stack
                                                    flexDirection="row"
                                                    gap={0.5}
                                                >
                                                    {selected.map((value) => (
                                                        <Chip
                                                            key={value}
                                                            color="primary"
                                                            label={value}
                                                        />
                                                    ))}
                                                </Stack>
                                            )}
                                        >
                                            {filters.map(
                                                ({ name, count, active }) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                active ?? false
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={name}
                                                        />
                                                        <Typography>
                                                            {count}
                                                        </Typography>
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ),
                        )}
                    </Grid>
                    <Grid container className="cards" gap={1}>
                        {cards.map((card, i) => (
                            <Grid
                                item
                                key={i}
                                sx={{
                                    width: card.attributes.artFront.data
                                        .attributes.formats.card.width,
                                }}
                            >
                                <Image
                                    src={
                                        card.attributes.artFront.data.attributes
                                            .formats.card.url
                                    }
                                    alt={card.attributes.title}
                                    width={
                                        card.attributes.artFront.data.attributes
                                            .formats.card.width
                                    }
                                    height={
                                        card.attributes.artFront.data.attributes
                                            .formats.card.height
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>
            <Drawer
                variant="persistent"
                open={rightDrawerOpen}
                anchor="right"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
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
                        <IconButton onClick={() => setRightDrawerOpen(false)}>
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
                            onClick={() => setModalOpen(true)}
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
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={{ p: 2 }}>
                    <Typography>
                        {JSON.stringify(swuCardsToSWUDBDeck(booster))}
                    </Typography>
                </Box>
            </Dialog>
        </Box>
    );
}
