"use client";

import FilterContext, { generateFilters } from "@/app/context/FilterContext";
import Filters, { applyFilterGroup } from "@/app/Filters";
import RightNav from "@/app/RightNav";
import { sortByAspectRarityCost } from "@/app/sort";
import theme from "@/app/theme";
import type { Card } from "@/types/card/Card";
import { Box, Grid, Paper, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";

export default function Home() {
    const [booster, setBooster] = useState<Card[]>([]);
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [filterGroup, setFilterGroup] = useState(generateFilters());

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

    const cards = applyFilterGroup({ filterGroup, cards: booster }).sort(
        sortByAspectRarityCost,
    );
    const drawerWidth = 240;
    return (
        <FilterContext.Provider value={{ filterGroup, setFilterGroup }}>
            <Box sx={{ display: "flex" }}>
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
                        <Filters cards={booster} />
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
                                            card.attributes.artFront.data
                                                .attributes.formats.card.url
                                        }
                                        alt={card.attributes.title}
                                        width={
                                            card.attributes.artFront.data
                                                .attributes.formats.card.width
                                        }
                                        height={
                                            card.attributes.artFront.data
                                                .attributes.formats.card.height
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Box>
                <RightNav
                    {...{ open: leftDrawerOpen, setOpen: setLeftDrawerOpen }}
                />
            </Box>
        </FilterContext.Provider>
    );
}
