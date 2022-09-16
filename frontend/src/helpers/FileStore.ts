import { createElementId } from "helpers/util";
import { addLogMessage } from "helpers/util";
import JSZip from "jszip";
import { ImageInfo } from "./ImageProcessor";

const uploadFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        var reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                resolve(reader.result as string);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }
    });
};

export default class FileStore {
    images: ImageInfo[];

    constructor() {
        this.images = [];
    }

    clear() {
        this.images
            .filter((imageInfo) => imageInfo.processedImageCanvas != null)
            .forEach((imageInfo) => {
                imageInfo.processedImageCanvas?.remove();
                imageInfo.processedImageCanvas = null;
            });
        this.images = [];
    }

    uploadImages(files: FileList | null) {
        return new Promise(async (resolve, reject) => {
            this.clear();
            if (files) {
                const filesArray = Array.from(files);
                let fileCount = 0;

                await Promise.all(
                    filesArray.map(async (file: File) => {
                        const fileContent = await uploadFile(file);
                        const machineId = parseInt(this.removeExtension(file.name));
                        if (!isNaN(machineId)) {
                            addLogMessage(`Uploading image ${file.name} ... done`);
                            const srcImage = new Image();
                            srcImage.src = fileContent;
                            fileCount++;

                            this.images.push({
                                elementId: createElementId(),
                                fileName: file.name,
                                fileSize: file.size,
                                machineId: machineId,
                                srcImage: srcImage,
                                processedImage: null,
                                processedImageCanvas: null,
                                externalId: null,
                            });
                        } else {
                            console.error(`File name ${file.name} does not contain valid machine id`);
                        }
                    })
                );

                addLogMessage(`Uploaded ${fileCount} images`);
            }
            resolve(this.images);
        });
    }

    removeExtension(filename: string) {
        return filename.substring(0, filename.lastIndexOf(".")) || filename;
    }

    hasImages() {
        return this.images.length > 0;
    }
}

export const createZipFile = async (images: ImageInfo[]) => {
    const zip = new JSZip();
    const filteredImages = images.filter((imageInfo) => imageInfo.processedImageCanvas != null);
    let zippedFilesCount = 0;

    for (const imageInfo of filteredImages) {
        const binaryContent = await new Promise((resolve) => imageInfo.processedImageCanvas?.toBlob(resolve));
        zip.file(imageInfo.fileName, binaryContent as ArrayBuffer, { binary: true });
        addLogMessage(`Adding ${imageInfo.fileName} to zip file ... done`);
        zippedFilesCount++;
    }
    addLogMessage(`Created zip file with ${zippedFilesCount} files`);
    return zip;
};
