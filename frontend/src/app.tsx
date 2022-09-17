import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Routes, Route } from "react-router-dom";
import Home from "routes/home";
import AppHeader from "components/app-header";
import FileStore from "helpers/file-store";
import ImageProcessor from "helpers/image-processor";

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
