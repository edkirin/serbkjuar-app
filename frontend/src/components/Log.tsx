import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import { localStore } from "helpers/store";
import { useState } from "react";

const Log = () => {
    const [logVisible, setLogVisible] = useState(localStore.logVisible);

    const showHideButtonLabel = logVisible ? "Hide log" : "Show log";
    const containerDisplayValue = logVisible ? "" : "none";

    const toggleLogVisible = () => {
        setLogVisible(!logVisible);
        localStore.logVisible = !logVisible;
    };

    return (
        <>
            <Fab
                variant="extended"
                size="small"
                color="primary"
                className="show-hide-log-button"
                onClick={toggleLogVisible}
            >
                {showHideButtonLabel}
            </Fab>
            <AppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0, display: containerDisplayValue }}
                className="log-container"
            >
                <textarea className="log" id="log-textarea" placeholder="Welcome to serbkjuar"></textarea>
            </AppBar>
        </>
    );
};

export { Log };
