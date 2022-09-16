import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";

const IMAGE_PLACEHOLDER = "/img/dummy-square.jpeg";

const ImageCard = (props) => {
    const imageInfo = props.imageInfo;
    const imgId = `${props.idPrefix || ""}${imageInfo.elementId}`;
    let imgSrc;
    let imgClass = "qr-img";

    switch (props.source) {
        case "source":
            imgSrc = imageInfo.srcImage.src;
            imgClass += " qr-source-img";
            break;
        case "processed":
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

export default function ImagesContainer(props) {
    let imageCards = "";

    if (props.images) {
        imageCards = props.images.map((imageInfo) => (
            <ImageCard key={imageInfo.fileName} imageInfo={imageInfo} source={props.source} idPrefix={props.idPrefix} />
        ));
    }

    return (
        <ImageList cols={10} className="qr-img-list">
            {imageCards}
        </ImageList>
    );
}
