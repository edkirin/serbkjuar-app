import { machinesApi } from "api";
import { addLogMessage } from "helpers/util";

const FETCH_CHUNK_SIZE = 5;

const TEXT_CONFIG = {
    size: 30, // px
    topMargin: 5, // px
    color: "black",
};

export default class ImageProcessor {
    cache = {};

    fetchExternalIds(images) {
        this.images = images;
        const chunks = this.sliceIntoChunks(images, FETCH_CHUNK_SIZE);

        return new Promise(async (resolve, reject) => {
            let imagesProcessed = 0;
            for (const chunk of chunks) {
                const results = await Promise.all(
                    chunk.map((imageInfo) => {
                        const cached = this.cache[imageInfo.machineId];
                        if (cached) {
                            return new Promise((resolve, reject) => {
                                resolve({
                                    data: cached,
                                });
                            });
                        } else {
                            return machinesApi.getExternalId(imageInfo.machineId);
                        }
                    })
                );
                const resultsData = results.map((result) => result.data);
                for (const result of resultsData) {
                    this.cache[result.machineId] = result;
                }
                this.processImages(images, resultsData);
                imagesProcessed += chunk.length;
            }
            addLogMessage(`Done processing ${imagesProcessed} images.`);
            resolve(this.images);
        });
    }

    processImages(images, resultsData) {
        for (const resultData of resultsData) {
            const imageInfo = images.find((imageInfo) => imageInfo.machineId === resultData.machineId);
            if (imageInfo) {
                imageInfo.externalId = resultData.externalId;
                addLogMessage(
                    `Processing image ${imageInfo.fileName} with machineId ${imageInfo.machineId} and externalId ${imageInfo.externalId}`
                );
                this.processImage(imageInfo);
            } else {
                console.error(`Unable to find image with machine id ${resultData.machineId}`);
            }
        }
    }

    processImage(imageInfo) {
        const createCanvas = (width, height) => {
            let canvas = document.createElement("canvas");
            canvas.setAttribute("width", `${width}px`);
            canvas.setAttribute("height", `${height}px`);
            return canvas;
        };

        const drawTextToCanvas = (context, sourceImg, textConfig, text) => {
            context.drawImage(sourceImg, 0, 0);
            context.font = `${textConfig.size}px Arial`;
            context.fillStyle = textConfig.color;
            context.textAlign = "center";
            context.fillText(text, context.canvas.width / 2, textConfig.size + textConfig.topMargin);
        };

        const copyCanvasToDestImg = (canvas, destImg) => {
            const canvasUrl = canvas.toDataURL();
            destImg.setAttribute("src", canvasUrl);
            return canvasUrl;
        };

        const srcImage = imageInfo.srcImage;
        const imgWidth = srcImage.width;
        const imgHeight = srcImage.height;
        const destImage = document.getElementById(`dest-${imageInfo.elementId}`);

        const canvas = createCanvas(imgWidth, imgHeight);
        const ctx = canvas.getContext("2d");
        drawTextToCanvas(ctx, srcImage, TEXT_CONFIG, imageInfo.externalId);
        imageInfo.processedImage = copyCanvasToDestImg(canvas, destImage);
        imageInfo.processedImageCanvas = canvas;
    }

    sliceIntoChunks(array, chunkSize) {
        const res = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
}
