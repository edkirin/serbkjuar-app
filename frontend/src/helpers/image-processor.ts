import { machinesApi } from "api";
import { addLogMessage } from "helpers/util";

export interface ImageInfo {
    machineId: number;
    externalId: string | null;
    fileName: string;
    fileSize: number;
    elementId: string;
    srcImage: HTMLImageElement;
    processedImage: string | null;
    processedImageCanvas: HTMLCanvasElement | null;
}

interface TextConfig {
    size: number; // px
    topMargin: number; // px
    color: string;
}

const TEXT_CONFIG: TextConfig = {
    size: 30, // px
    topMargin: 5, // px
    color: "black",
};

export default class ImageProcessor {
    images: ImageInfo[] = [];

    fetchExternalIds(images: ImageInfo[]) {
        this.images = images;

        return new Promise<void>(async (resolve, reject) => {
            images.forEach((imageInfo) => {
                machinesApi
                    .getExternalId(imageInfo.machineId)
                    .then((response) => {
                        imageInfo.externalId = response.data.externalId;
                        addLogMessage(
                            `Processing image ${imageInfo.fileName} with machineId ${imageInfo.machineId} and externalId ${imageInfo.externalId}`
                        );
                        this.processImage(imageInfo);

                        addLogMessage(`Done processing ${imageInfo.fileName} => ${imageInfo.externalId}`);
                    })
                    .catch((err) => {
                        addLogMessage(`Error: ${err.response.data.details}`);
                    });
            });

            resolve();
        });
    }

    processImage(imageInfo: ImageInfo) {
        const createCanvas = (width: number, height: number): HTMLCanvasElement => {
            let canvas = document.createElement("canvas");
            canvas.setAttribute("width", `${width}px`);
            canvas.setAttribute("height", `${height}px`);
            return canvas;
        };

        const drawTextToCanvas = (
            context: CanvasRenderingContext2D | null,
            sourceImg: HTMLImageElement,
            textConfig: TextConfig,
            text: string
        ) => {
            if (!context) return;
            context.drawImage(sourceImg, 0, 0);
            context.font = `${textConfig.size}px Arial`;
            context.fillStyle = textConfig.color;
            context.textAlign = "center";
            context.fillText(text, context.canvas.width / 2, textConfig.size + textConfig.topMargin);
        };

        const copyCanvasToDestImg = (canvas: HTMLCanvasElement, destImg: HTMLImageElement): string => {
            const canvasUrl = canvas.toDataURL();
            destImg.setAttribute("src", canvasUrl);
            return canvasUrl;
        };

        const srcImage = imageInfo.srcImage;
        const imgWidth = srcImage.width;
        const imgHeight = srcImage.height;
        const destImage = document.getElementById(`dest-${imageInfo.elementId}`);

        if (destImage && imageInfo.externalId) {
            const canvas = createCanvas(imgWidth, imgHeight);
            const ctx = canvas.getContext("2d");
            drawTextToCanvas(ctx, srcImage, TEXT_CONFIG, imageInfo.externalId);
            imageInfo.processedImage = copyCanvasToDestImg(canvas, destImage as HTMLImageElement);
            imageInfo.processedImageCanvas = canvas;
        }
    }
}
