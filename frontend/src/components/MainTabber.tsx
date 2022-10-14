import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { TabPanel } from "components";

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

interface Props {
    processingTabContentTabEnabled: boolean;
    uploadTabContent?: React.ReactNode;
    processingTabContent?: React.ReactNode;
}

const MainTabber = (props: Props) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
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
};

export { MainTabber };
