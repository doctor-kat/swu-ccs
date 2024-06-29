"use client";

import GlobalContext, { generateFilters } from "@/app/context/GlobalContext";
import Filters, { applyFilterGroup } from "@/app/Filters";
import GroupBy from "@/app/GroupBy";
import { groupBy } from "@/app/GroupBy/util";
import RightNav from "@/app/RightNav";
import theme from "@/app/theme";
import type { Card, CardAttributes } from "@/types/card/Card";
import { ExpandCircleDown, MenuOpen } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Box,
    Grid,
    IconButton,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";

export default function Home() {
    const [booster, setBooster] = useState<Card[]>([]);
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [filterGroup, setFilterGroup] = useState(generateFilters());
    const [grouping, setGrouping] = useState<keyof CardAttributes>("aspects");

    useEffect(() => {
        fetch(`/api/booster?count=6`, {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((booster) => {
                setBooster(booster);
            });
    }, []);

    if (!booster?.length) {
        return "Loading...";
    }

    const filteredCards = applyFilterGroup({
        filterGroup,
        cards: booster,
    });
    const group = groupBy(filteredCards, grouping);
    const drawerWidth = 240;
    return (
        <GlobalContext.Provider
            value={{ filterGroup, setFilterGroup, grouping, setGrouping }}
        >
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
                            onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
                        >
                            <MenuOpen />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <LeftNav
                    {...{ open: leftDrawerOpen, setOpen: setLeftDrawerOpen }}
                />
                <Box
                    component={Paper}
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
                            marginLef: 0,
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
                    <Stack gap={2}>
                        <GroupBy />
                        <Filters cards={booster} />
                        <Stack className="cards" gap={1}>
                            {Object.entries(group).map(([key, cards]) => (
                                <Accordion key={key}>
                                    <AccordionSummary
                                        expandIcon={<ExpandCircleDown />}
                                    >
                                        {key}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container gap={1}>
                                            {cards.map((card, i) => (
                                                <Grid
                                                    item
                                                    key={i}
                                                    sx={{
                                                        width: card.attributes
                                                            .artFront.data
                                                            .attributes.formats
                                                            .card.width,
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            card.attributes
                                                                .artFront.data
                                                                .attributes
                                                                .formats.card
                                                                .url
                                                        }
                                                        alt={
                                                            card.attributes
                                                                .title
                                                        }
                                                        width={
                                                            card.attributes
                                                                .artFront.data
                                                                .attributes
                                                                .formats.card
                                                                .width
                                                        }
                                                        height={
                                                            card.attributes
                                                                .artFront.data
                                                                .attributes
                                                                .formats.card
                                                                .height
                                                        }
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
                <RightNav
                    {...{
                        open: rightDrawerOpen,
                        setOpen: setRightDrawerOpen,
                        cards: booster,
                    }}
                />
            </Box>
        </GlobalContext.Provider>
    );
}
