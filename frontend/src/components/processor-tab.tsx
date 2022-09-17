import React, { useState } from "react";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import ImagesContainer from "components/images-container";
import { createZipFile } from "helpers/file-store";
import { ImageInfo } from "helpers/image-processor";
import { ImageContainerSourceEnum } from "helpers/enums";
import { DOWNLOAD_FILENAME } from "const";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Preset, PRESETS } from "helpers/presets";
import Box from "@mui/material/Box";

interface Props {
    onStartProcessing: (preset: Preset) => void;
    imagesProcessed: boolean;
    images: ImageInfo[] | null;
}

export default function ProcessorTab(props: Props) {
    const [presetIndex, setPresetIndex] = useState<number>(0);

    const handlePresetChange = (event: SelectChangeEvent) => {
        const presetIndex = parseInt(event.target.value);
        console.log("handlePresetChange presetIndex", presetIndex);
        setPresetIndex(presetIndex);
    };

    const handleStartProcessingClick = async () => {
        props.onStartProcessing(PRESETS[presetIndex]);
    };

    const handleDownloadClick = async () => {
        if (!props.images) return;
        const zip = await createZipFile(props.images);
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            saveAs(blob, DOWNLOAD_FILENAME);
        });
    };

    const presetItems = PRESETS.map((preset, index) => {
        return (
            <MenuItem value={index} key={index}>
                {preset.name}
            </MenuItem>
        );
    });

    return (
        <>
            <Box sx={{ display: "flex" }}>
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
                <FormControl size="small" sx={{ marginLeft: "auto" }}>
                    <InputLabel id="preset-select-label">Preset</InputLabel>
                    <Select
                        labelId="preset-select-label"
                        value={`${presetIndex}`}
                        label="Preset"
                        onChange={handlePresetChange}
                    >
                        {presetItems}
                    </Select>
                </FormControl>
            </Box>

            <ImagesContainer images={props.images} source={ImageContainerSourceEnum.PROCESSED} idPrefix="dest-" />
        </>
    );
}
