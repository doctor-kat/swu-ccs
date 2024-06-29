import GlobalContext, { FILTER_KEYS } from "@/app/context/GlobalContext";
import { applyFilterGroup, getDistinctValues } from "@/app/Filters/util";
import { Card, CardAttributes } from "@/types/card/Card";
import {
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React, { useContext } from "react";

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

const GroupBy: React.FC<FiltersProps> = ({ cards }) => {
    const { grouping, setGrouping } = useContext(GlobalContext);

    return (
        <Grid container className="filters" gap={1}>
            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel>Group by</InputLabel>
                    <Select
                        color="primary"
                        variant="outlined"
                        value={grouping}
                        input={<OutlinedInput label="Tag" />}
                        onChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            setGrouping(value);
                        }}
                    >
                        {Object.entries(FILTER_KEYS).map(([label, key]) => (
                            <MenuItem key={key} value={key}>
                                <ListItemText primary={label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
export default GroupBy;
