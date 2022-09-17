export enum PositionEnum {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
}

export enum AlignmentEnum {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
}

export enum ContentType {
    MACHINE_EXTERNAL_ID = "external-id",
    STATIC = "static",
}

export interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export interface TextConfig {
    fontSize: number;
    marginOffsetX: number;
    marginOffsetY: number;
    color: string;
    align: AlignmentEnum;
    position?: PositionEnum;
}

export interface PresetContentConfig {
    type: ContentType;
    value?: string;
    textConfig: TextConfig;
}

export interface Preset {
    name: string;
    /** Ratio heigth/width for destination image. Use 1 for square. */
    heightRatio: number;
    contents: PresetContentConfig[];
    /** Relevant image content without margins. */
    srcImageBoundingRect: Rect;
    backgroundColor: string;
}

export const PRESETS: Preset[] = [
    {
        name: "Default Machine external_id",
        heightRatio: 1,
        backgroundColor: "#FFFFFF",
        srcImageBoundingRect: {
            left: 51,
            right: 348,
            top: 51,
            bottom: 348,
        },
        contents: [
            {
                type: ContentType.MACHINE_EXTERNAL_ID,
                textConfig: {
                    fontSize: 30,
                    color: "#000000",
                    align: AlignmentEnum.CENTER,
                    position: PositionEnum.TOP,
                    marginOffsetX: 0,
                    marginOffsetY: 15,
                },
            },
        ],
    },
    {
        name: "Machine external_id + Skeniraj me za račun",
        heightRatio: 1.5,
        backgroundColor: "#FFFFFF",
        srcImageBoundingRect: {
            left: 51,
            right: 348,
            top: 51,
            bottom: 348,
        },
        contents: [
            {
                type: ContentType.MACHINE_EXTERNAL_ID,
                textConfig: {
                    fontSize: 45,
                    color: "#000000",
                    align: AlignmentEnum.CENTER,
                    position: PositionEnum.TOP,
                    marginOffsetX: 0,
                    marginOffsetY: 55,
                },
            },
            {
                type: ContentType.STATIC,
                value: "Skeniraj me za račun",
                textConfig: {
                    fontSize: 38,
                    color: "#000000",
                    align: AlignmentEnum.CENTER,
                    position: PositionEnum.BOTTOM,
                    marginOffsetX: 0,
                    marginOffsetY: 50,
                },
            },
        ],
    },
];
