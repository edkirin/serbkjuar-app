import React, { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import MainTabber from "components/MainTabber";
import UploadImagesTab from "components/UploadImagesTab";
import ProcessorTab from "components/ProcessorTab";

export default function Home(props) {
    const fileStore = props.fileStore;
    const imageProcessor = props.imageProcessor;
    const [processingTabTabEnabled, setProcessingTabEnabled] = useState(false);
    const [uploadedImages, setUploadedImages] = useState(null);
    const [imagesProcessed, setImagesProcessed] = useState(false);

    const onSelectFilesForUpload = async (files) => {
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
                <textarea
                    className="log"
                    cols="30"
                    rows="10"
                    id="log-textarea"
                    placeholder="Welcome to serbkjuar"
                ></textarea>
            </AppBar>
        </>
    );
}
