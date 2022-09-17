import React from "react";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import ImagesContainer from "components/images-container";
import { createZipFile } from "helpers/file-store";
import { ImageInfo } from "helpers/image-processor";
import { ImageContainerSourceEnum } from "helpers/enums";
import { DOWNLOAD_FILENAME } from "const";

interface Props {
    onStartProcessing: () => void;
    imagesProcessed: boolean;
    images: ImageInfo[] | null;
}

export default function ProcessorTab(props: Props) {
    const handleStartProcessingClick = async () => {
        props.onStartProcessing();
    };

    const handleDownloadClick = async () => {
        if (!props.images) return;
        const zip = await createZipFile(props.images);
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            saveAs(blob, DOWNLOAD_FILENAME);
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
            <ImagesContainer images={props.images} source={ImageContainerSourceEnum.PROCESSED} idPrefix="dest-" />
        </>
    );
}
