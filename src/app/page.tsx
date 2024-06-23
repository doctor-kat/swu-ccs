"use client";

import { groupBy, sortByAspectThenCost } from "@/app/sort";
import theme from "@/app/theme";
import { ArtSize } from "@/types/card/Art";
import { Aspect } from "@/types/card/attributes/Aspect";
import { Rarity } from "@/types/card/attributes/Rarity";
import { Type } from "@/types/card/attributes/Type";
import { Card } from "@/types/card/Card";
import {
    CheckBox,
    ChevronLeft,
    ChevronRight,
    CopyAll,
    ExpandMore,
    MenuOpen,
    OpenInBrowser,
    Search,
} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

function mapCardArtFront(cards: Card[]): React.JSX.Element[] {
    return cards.map((card, i) => {
        const type: Type = card.attributes.type.data.attributes.name;
        const isBaseOrLeader = [Type.BASE, Type.LEADER].includes(type);
        return (
            <img
                key={i}
                src={
                    card.attributes.artFront.data.attributes.formats[
                        ArtSize.CARD
                    ]?.url
                }
                width={isBaseOrLeader ? 400 : 286}
                height={isBaseOrLeader ? 286 : 400}
                alt={card.attributes.title}
            />
        );
    });
}

export default function Home() {
    const [booster, setBooster] = useState<Card[]>([]);
    useEffect(() => {
        fetch(`/api/booster?count=6`, {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((booster) => setBooster(booster));
    }, []);

    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

    if (!booster?.length) {
        return "Loading...";
    }

    sortByAspectThenCost(booster);
    const { keywords, traits } = groupBy(booster);

    const join = (data: any) =>
        data.map((d: any) => d.attributes.name).join(", ");

    // group by name and count
    const data: any[] = booster.map((card) => ({
        ...card.attributes,
        id: card.id,
        aspects: join(card.attributes.aspects.data),
        type: card.attributes.type.data.attributes.name,
        traits: join(card.attributes.traits.data),
        arena: join(card.attributes.arenas.data),
        keywords: join(card.attributes.keywords.data),
        rarity: card.attributes.rarity.data.attributes.name,
        expansion: card.attributes.expansion.data.attributes.name,
    }));
    const columns: GridColDef<typeof data>[] = [
        { field: "title", headerName: "name" },
    ];

    const drawerWidth = 240;
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <AppBar
                    position="fixed"
                    // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
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
                            <IconButton
                                onClick={() => setLeftDrawerOpen(false)}
                            >
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
                        {Object.entries({
                            Type: [
                                Type.LEADER,
                                Type.BASE,
                                Type.UNIT,
                                Type.EVENT,
                                Type.UPGRADE,
                            ],
                            Aspect: [
                                Aspect.BLUE,
                                Aspect.GREEN,
                                Aspect.RED,
                                Aspect.YELLOW,
                                Aspect.WHITE,
                                Aspect.BLACK,
                            ],
                            Rarity: [
                                Rarity.LEGENDARY,
                                Rarity.RARE,
                                Rarity.UNCOMMON,
                                Rarity.COMMON,
                            ],
                            Keywords: keywords,
                            Traits: traits,
                        }).map(([header, options]) => (
                            <Accordion key={header}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    {header}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {options.map((text) => (
                                            <ListItem key={text} disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <CheckBox />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={text}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        marginLeft: `-${drawerWidth}px`,
                        ...(leftDrawerOpen && {
                            transition: theme.transitions.create("margin", {
                                easing: theme.transitions.easing.easeOut,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                            marginLeft: 0,
                        }),
                        marginRight: `-${drawerWidth}px`,
                        ...(rightDrawerOpen && {
                            transition: theme.transitions.create("margin", {
                                easing: theme.transitions.easing.easeOut,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                            marginRight: 0,
                        }),
                    }}
                >
                    <Toolbar />
                    <DataGrid rows={data} columns={columns} />
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
                            <IconButton
                                onClick={() => setRightDrawerOpen(false)}
                            >
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
                            <ListItem disablePadding>
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
            </Box>
        </>
    );
}
