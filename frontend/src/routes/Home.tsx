import { useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { MainTabber, ProcessorTab, UploadImagesTab } from "components";
import FileStore from "helpers/file-store";
import ImageProcessor, { ImageInfo } from "helpers/image-processor";
import { Preset } from "helpers/presets";

interface Props {
    fileStore: FileStore;
    imageProcessor: ImageProcessor;
}

function Home(props: Props) {
    const fileStore = props.fileStore;
    const imageProcessor = props.imageProcessor;
    const [processingTabTabEnabled, setProcessingTabEnabled] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<ImageInfo[] | null>(null);
    const [imagesProcessed, setImagesProcessed] = useState(false);

    const onSelectFilesForUpload = async (files: FileList | null) => {
        fileStore.uploadImages(files).then(() => {
            setUploadedImages(fileStore.images);
            setImagesProcessed(false);
            setProcessingTabEnabled(fileStore.hasImages());
        });
    };

    const onClearUploadedFiles = () => {
        fileStore.clear();
        setUploadedImages(null);
        setImagesProcessed(false);
    };

    const onStartProcessing = (preset: Preset) => {
        imageProcessor.fetchExternalIds(fileStore.images, preset).then(() => {
            setImagesProcessed(true);
        });
    };

    return (
        <>
            <Container maxWidth={false} className="content-container">
                <MainTabber
                    uploadTabContent={
                        <UploadImagesTab
                            images={uploadedImages}
                            onSelectFiles={onSelectFilesForUpload}
                            onClearFiles={onClearUploadedFiles}
                        />
                    }
                    processingTabContent={
                        <ProcessorTab
                            images={uploadedImages}
                            onStartProcessing={onStartProcessing}
                            imagesProcessed={imagesProcessed}
                        />
                    }
                    processingTabContentTabEnabled={processingTabTabEnabled}
                />
            </Container>
            <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }} className="log-container">
                <textarea className="log" id="log-textarea" placeholder="Welcome to serbkjuar"></textarea>
            </AppBar>
        </>
    );
}

export { Home };
