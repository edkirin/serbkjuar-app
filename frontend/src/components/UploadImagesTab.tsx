import React from "react";
import Button from "@mui/material/Button";
import { ImagesContainer } from "components";
import { ImageInfo } from "helpers/image-processor";
import { ImageContainerSourceEnum } from "helpers/enums";

interface Props {
    onSelectFiles: (files: FileList | null) => Promise<void>;
    onClearFiles: () => void;
    images: ImageInfo[] | null;
}

const UploadImagesTab = (props: Props) => {
    const handleFileSelect = (event: React.FormEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if (!files?.length) return;
        props.onSelectFiles(files);
        event.currentTarget.value = "";
    };

    const handleClear = () => {
        props.onSelectFiles(null);
    };

    return (
        <>
            <Button variant="outlined" component="label">
                Upload
                <input type="file" accept=".png, .jpg, .jpeg" multiple hidden onChange={(e) => handleFileSelect(e)} />
            </Button>
            <Button variant="outlined" component="label" onClick={handleClear} sx={{ marginLeft: "10px" }}>
                Clear
            </Button>
            <ImagesContainer images={props.images} source={ImageContainerSourceEnum.SOURCE} idPrefix="src-" />
        </>
    );
};

export { UploadImagesTab };
