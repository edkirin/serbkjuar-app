import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import Slide from "@mui/material/Slide";
import { localStore } from "helpers/store";
import { useState } from "react";

const Log = () => {
    const [logVisible, setLogVisible] = useState(localStore.logVisible);
    const showHideButtonLabel = logVisible ? "Hide log" : "Show log";

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
            <Slide direction="up" in={logVisible} appear={false}>
                <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }} className="log-container">
                    <textarea className="log" id="log-textarea" placeholder="Welcome to serbkjuar"></textarea>
                </AppBar>
            </Slide>
        </>
    );
};

export { Log };
