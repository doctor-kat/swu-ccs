"use client";

import { generateBooster } from "@/app/api/booster/generateBooster";
import { getAllCards } from "@/app/api/cards/swu";
import GlobalContext, { generateFilters } from "@/app/context/GlobalContext";
import Filters, { applyFilterGroup } from "@/app/Filters";
import GalacticRepublic from "@/app/GalacticRepublic";
import GroupBy, { LOCALSTORAGE_GROUPBY_KEY } from "@/app/GroupBy";
import { groupBy } from "@/app/GroupBy/util";
import theme from "@/app/theme";
import { Expansion } from "@/types/card/attributes/Expansion";
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
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
    const [filterGroup, setFilterGroup] = useState(generateFilters());
    const [grouping, setGrouping] = useState<keyof CardAttributes>("aspects");

    useEffect(() => {
        (async () => {
            generateBooster({
                expansion: Expansion.SHD,
                count: 6,
                cards: await getAllCards(),
            }).then((booster) => {
                setBooster(booster);
            });

            const lastGrouping = localStorage.getItem(LOCALSTORAGE_GROUPBY_KEY);
            if (lastGrouping) {
                setGrouping(lastGrouping as keyof CardAttributes);
            }
        })();
    }, []);

    if (!booster?.length) {
        return "Loading...may take up to 1 minute on first load";
    }

    const filteredCards = applyFilterGroup({
        filterGroup,
        cards: booster,
    });
    const group = groupBy(filteredCards, grouping);
    return (
        <GlobalContext.Provider
            value={{
                filterGroup,
                setFilterGroup,
                grouping,
                setGrouping: (group) => {
                    localStorage.setItem(
                        LOCALSTORAGE_GROUPBY_KEY,
                        group as string,
                    );
                    return setGrouping(group);
                },
            }}
        >
            <Box sx={{ display: "flex" }}>
                <AppBar
                    position="fixed"
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
                            sx={{ mr: 2 }}
                        >
                            <MenuOpen
                                sx={{
                                    transform: leftDrawerOpen
                                        ? null
                                        : "scaleX(-1)",
                                }}
                            />
                        </IconButton>
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            gap={0.5}
                        >
                            <GalacticRepublic />
                            <Typography variant="h6" flexGrow={1}>
                                SWU Cardboard Crack Simulator
                            </Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <LeftNav
                    {...{
                        open: leftDrawerOpen,
                        setOpen: setLeftDrawerOpen,
                        cards: booster,
                    }}
                />
                <Box
                    component={Paper}
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        ...(leftDrawerOpen && {
                            transition: theme.transitions.create("margin", {
                                easing: theme.transitions.easing.easeOut,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                        }),
                    }}
                >
                    <Toolbar />
                    <Stack gap={2}>
                        <Grid container alignItems="flex-start" gap={1}>
                            <Grid item flexGrow={1}>
                                <Filters cards={booster} />
                            </Grid>
                            <Grid item sx={{ minWidth: 100 }}>
                                <GroupBy />
                            </Grid>
                        </Grid>
                        <Stack className="cards" gap={1}>
                            {Object.entries(group).map(([key, cards]) => (
                                <Accordion
                                    key={key}
                                    sx={{
                                        "& .MuiAccordionSummary-root.Mui-expanded":
                                            {
                                                boxShadow: 1,
                                            },
                                    }}
                                    defaultExpanded
                                >
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
            </Box>
        </GlobalContext.Provider>
    );
}
