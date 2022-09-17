import React from "react";
import { Box } from "@mui/material";

interface Props {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanel(props: Props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
