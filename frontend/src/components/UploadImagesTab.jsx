import React from "react";
import Button from "@mui/material/Button";
import ImagesContainer from "components/ImagesContainer";

export default function UploadImagesTab(props) {
    const handleFileSelect = (event) => {
        const files = event.target.files;
        if (!files.length) return;
        props.onSelectFiles(files);
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
            <ImagesContainer images={props.images} source="source" idPrefix="src-" />
        </>
    );
}
