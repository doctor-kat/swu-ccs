import GlobalContext, { FILTER_KEYS } from "@/app/context/GlobalContext";
import { applyFilterGroup, getDistinctValues } from "@/app/Filters/util";
import { CardAttributes } from "@/types/card/Card";
import { PivotTableChart } from "@mui/icons-material";
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

const GroupBy = () => {
    const { grouping, setGrouping } = useContext(GlobalContext);

    return (
        <Grid container className="filters" gap={1}>
            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel>
                        <PivotTableChart /> Group by
                    </InputLabel>
                    <Select
                        color="secondary"
                        variant="outlined"
                        value={grouping}
                        input={<OutlinedInput label="Tag" />}
                        onChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            setGrouping(value as keyof CardAttributes);
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
