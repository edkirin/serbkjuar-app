import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { ImageInfo } from "helpers/image-processor";
import { ImageContainerSourceEnum } from "helpers/enums";

const IMAGE_PLACEHOLDER = "/img/dummy-square.jpeg";

interface ImageCardProps {
    imageInfo: ImageInfo;
    idPrefix: string;
    source: ImageContainerSourceEnum;
}

const ImageCard = (props: ImageCardProps) => {
    const imageInfo = props.imageInfo;
    const imgId = `${props.idPrefix || ""}${imageInfo.elementId}`;
    let imgSrc;
    let imgClass = "qr-img";

    switch (props.source) {
        case ImageContainerSourceEnum.SOURCE:
            imgSrc = imageInfo.srcImage.src;
            imgClass += " qr-source-img";
            break;
        case ImageContainerSourceEnum.PROCESSED:
            imgSrc = imageInfo.processedImage || IMAGE_PLACEHOLDER;
            imgClass += " qr-processed-img";
            break;
        default:
            imgSrc = IMAGE_PLACEHOLDER;
    }

    return (
        <ImageListItem key={imageInfo.fileName} className="qr-img-list-item">
            <img src={imgSrc} className={imgClass} alt={imageInfo.fileName} id={imgId} />
            <Typography className="qr-img-title">{imageInfo.fileName}</Typography>
        </ImageListItem>
    );
};

interface Props {
    images: ImageInfo[] | null;
    idPrefix: string;
    source: ImageContainerSourceEnum;
}

export default function ImagesContainer(props: Props) {
    let imageCards = null;

    if (props.images) {
        imageCards = props.images.map((imageInfo) => (
            <ImageCard key={imageInfo.fileName} imageInfo={imageInfo} source={props.source} idPrefix={props.idPrefix} />
        ));
    }

    return (
        <ImageList cols={10} className="qr-img-list">
            {imageCards !== null ? imageCards : ""}
        </ImageList>
    );
}
