import React from "react";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import ImagesContainer from "components/ImagesContainer";
import { createZipFile } from "helpers/FileStore";

export default function ProcessorTab(props) {
    const handleStartProcessingClick = async () => {
        props.onStartProcessing();
    };

    const handleDownloadClick = async () => {
        const zip = await createZipFile(props.images);
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            saveAs(blob, "serbkjuar-out.zip");
        });
    };

    return (
        <>
            <Button variant="outlined" component="label" onClick={handleStartProcessingClick}>
                Start Processing
            </Button>
            <Button
                variant="outlined"
                component="label"
                onClick={handleDownloadClick}
                sx={{ marginLeft: "10px" }}
                disabled={!props.imagesProcessed}
            >
                Download
            </Button>
            <ImagesContainer images={props.images} source="processed" idPrefix="dest-" />
        </>
    );
}
