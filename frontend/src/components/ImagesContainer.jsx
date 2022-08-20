import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const IMAGE_PLACEHOLDER = "/img/dummy-square.jpeg";

const ImageCard = (props) => {
    const imageInfo = props.imageInfo;
    const imgId = `${props.idPrefix || ""}${imageInfo.elementId}`;
    let imgSrc;

    switch (props.source) {
        case "source":
            imgSrc = imageInfo.srcImage.src;
            break;
        case "processed":
            imgSrc = imageInfo.processedImage || IMAGE_PLACEHOLDER;
            break;
        default:
            imgSrc = IMAGE_PLACEHOLDER;
    }

    return (
        <ImageListItem key={imageInfo.fileName}>
            <img src={imgSrc} alt={imageInfo.fileName} id={imgId} />
            <ImageListItemBar title={imageInfo.fileName} position="below" sx={{ textAlign: "center" }} />
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

    return <ImageList cols={10}>{imageCards}</ImageList>;
}
