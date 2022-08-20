import React, { useState } from "react";
import { Box } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";

function TabPanel(props) {
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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

export default function MainTabber(props) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Upload Images" {...a11yProps(0)} />
                    <Tab label="Processor" {...a11yProps(1)} disabled={!props.processingTabContentTabEnabled} />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                {props.uploadTabContent}
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                {props.processingTabContent}
            </TabPanel>
        </Box>
    );
}
