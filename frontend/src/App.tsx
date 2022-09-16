import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import AppHeader from "components/AppHeader";
import FileStore from "helpers/FileStore";
import ImageProcessor from "helpers/ImageProcessor";

function App() {
    const fileStore = new FileStore();
    const imageProcessor = new ImageProcessor();

    return (
        <ThemeProvider theme={theme}>
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home fileStore={fileStore} imageProcessor={imageProcessor} />} />
                {/* <Route path="*" element={<NotFound404 />} /> */}
            </Routes>
        </ThemeProvider>
    );
}

export default App;
