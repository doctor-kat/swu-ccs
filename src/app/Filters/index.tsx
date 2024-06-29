import GlobalContext, { generateFilters } from "@/app/context/GlobalContext";
import {
    applyFilterGroup,
    getDistinctValues,
    updateCounts,
} from "@/app/Filters/util";
import { Card, CardAttributes } from "@/types/card/Card";
import {
    Checkbox,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

export { getDistinctValues, applyFilterGroup };

export type FilterGroup = Record<string, FilterItem[]>;
export type FilterItem = {
    name: string;
    count: number;
    key: keyof CardAttributes;
    active?: boolean;
};

type FiltersProps = {
    cards: Card[];
};

const Filters: React.FC<FiltersProps> = ({ cards }) => {
    const { filterGroup, setFilterGroup } = useContext(GlobalContext);

    useEffect(() => {
        setFilterGroup(generateFilters(cards));
    }, [cards, setFilterGroup]);

    return (
        <Grid container className="filters" gap={1}>
            {Object.entries(filterGroup).map(([label, filters]) => (
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
                            input={<OutlinedInput label="Tag" />}
                            onChange={(event) => {
                                const {
                                    target: { value },
                                } = event;
                                const next = {
                                    ...filterGroup,
                                    [label]: filterGroup[label].map((f) => ({
                                        ...f,
                                        active: (value as string[]).includes(
                                            f.name,
                                        ),
                                    })),
                                };
                                const filteredCards = applyFilterGroup({
                                    cards,
                                    filterGroup: next,
                                });
                                updateCounts({
                                    filterGroup: next,
                                    cards: filteredCards,
                                });
                                setFilterGroup(next);
                            }}
                            renderValue={(selected) => (
                                <Stack flexDirection="row" gap={0.5}>
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
                            {filters.map(({ name, count, active }) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={active ?? false} />
                                    <ListItemText primary={name} />
                                    <Typography>{count}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            ))}
        </Grid>
    );
};
export default Filters;
