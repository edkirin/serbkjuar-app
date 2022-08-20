import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Routes, Route } from "react-router-dom";
import AppHeader from "components/AppHeader";
import Home from "routes/Home";
import FileStore from "helpers/FileStore";
import ImageProcessor from "helpers/ImageProcessor";

function App() {
    const fileStore = new FileStore();
    const imageProcessor = new ImageProcessor();

    return (
        <ThemeProvider theme={theme}>
            <AppHeader />
            <Routes>
                <Route exact path="/" element={<Home fileStore={fileStore} imageProcessor={imageProcessor} />} />
                {/* <Route path="*" element={<NotFound404 />} /> */}
            </Routes>
        </ThemeProvider>
    );
}

export default App;
