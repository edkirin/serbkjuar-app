import { useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import MainTabber from "components/main-tabber";
import UploadImagesTab from "components/upload-images-tab";
import ProcessorTab from "components/processor-tab";
import FileStore from "helpers/file-store";
import ImageProcessor, { ImageInfo } from "helpers/image-processor";

interface Props {
    fileStore: FileStore;
    imageProcessor: ImageProcessor;
}

export default function Home(props: Props) {
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

    const onStartProcessing = () => {
        imageProcessor.fetchExternalIds(fileStore.images).then(() => {
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
