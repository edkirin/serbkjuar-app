import { machinesApi } from "api";
import { addLogMessage } from "helpers/util";
import {
    AlignmentEnum,
    ContentType,
    PositionEnum,
    Preset,
    PresetContentConfig,
    PRESETS,
    TextConfig,
} from "helpers/presets";

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

export default class ImageProcessor {
    images: ImageInfo[] = [];

    fetchExternalIds(images: ImageInfo[]) {
        this.images = images;
        const defaultPreset = PRESETS[1];

        return new Promise<void>(async (resolve, reject) => {
            images.forEach((imageInfo) => {
                machinesApi
                    .getExternalId(imageInfo.machineId)
                    .then((response) => {
                        imageInfo.externalId = response.data.externalId;
                        addLogMessage(
                            `Processing image ${imageInfo.fileName} with machineId ${imageInfo.machineId} and externalId ${imageInfo.externalId}`
                        );
                        this.processImage(imageInfo, defaultPreset);

                        addLogMessage(`Done processing ${imageInfo.fileName} => ${imageInfo.externalId}`);
                    })
                    .catch((err) => {
                        addLogMessage(`Error: ${err.response.data.details}`);
                    });
            });

            resolve();
        });
    }

    processImage(imageInfo: ImageInfo, preset: Preset) {
        const composer = new ImageComposer(imageInfo, preset);
        composer.createImage();
    }
}

class ImageComposer {
    imageInfo: ImageInfo;
    preset: Preset;
    srcImageWidth: number;
    srcImageHeight: number;
    destImageWidth: number;
    destImageHeight: number;
    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D;

    constructor(imageInfo: ImageInfo, preset: Preset) {
        this.imageInfo = imageInfo;
        this.preset = preset;
        this.srcImageWidth = imageInfo.srcImage.width;
        this.srcImageHeight = imageInfo.srcImage.height;
        this.destImageWidth = this.srcImageWidth;
        this.destImageHeight = this.srcImageHeight;
        this.canvas = this.createCanvas(this.srcImageWidth, this.srcImageHeight);
        this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    createCanvas = (width: number, height: number): HTMLCanvasElement => {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", `${width}px`);
        canvas.setAttribute("height", `${height}px`);
        return canvas;
    };

    drawSourceImageToCanvas = (sourceImg: HTMLImageElement) => {
        this.canvasCtx.drawImage(sourceImg, 0, 0);
    };

    copyCanvasToDestImg = (destImg: HTMLImageElement): string => {
        const canvasUrl = this.canvas.toDataURL();
        destImg.setAttribute("src", canvasUrl);
        return canvasUrl;
    };

    drawTextToCanvas = (text: string, textConfig: TextConfig) => {
        this.canvasCtx.font = `${textConfig.fontSize}px Arial`;
        this.canvasCtx.fillStyle = textConfig.color;
        this.canvasCtx.textAlign = textConfig.align;

        let textOffsetX;
        let textOffsetY;
        switch (textConfig.align) {
            case AlignmentEnum.CENTER:
                textOffsetX = this.canvasCtx.canvas.width / 2;
                break;
            case AlignmentEnum.RIGHT:
                textOffsetX = this.canvasCtx.canvas.width - textConfig.marginOffsetX;
                break;
            default:
                textOffsetX = textConfig.marginOffsetX;
                break;
        }
        if (textConfig.position === PositionEnum.TOP) {
            this.canvasCtx.textBaseline = "top";
            textOffsetY = textConfig.marginOffsetY;
        } else {
            this.canvasCtx.textBaseline = "bottom";
            textOffsetY = this.destImageHeight - textConfig.marginOffsetY;
        }
        this.canvasCtx.fillText(text, textOffsetX, textOffsetY);
    };

    createImage = () => {
        this.drawSourceImageToCanvas(this.imageInfo.srcImage);

        this.preset.contents.forEach((content) => {
            let text;
            switch (content.type) {
                case ContentType.MACHINE_EXTERNAL_ID:
                    if (!this.imageInfo.externalId) return;
                    text = this.imageInfo.externalId;
                    break;
                case ContentType.STATIC:
                    if (!content.value) return;
                    text = content.value;
                    break;
                default:
                    return;
            }
            this.drawTextToCanvas(text, content.textConfig);
        });

        const destImage = document.getElementById(`dest-${this.imageInfo.elementId}`);
        this.imageInfo.processedImage = this.copyCanvasToDestImg(destImage as HTMLImageElement);
        this.imageInfo.processedImageCanvas = this.canvas;
    };
}
