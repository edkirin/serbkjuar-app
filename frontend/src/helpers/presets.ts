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
    heightRatio?: number;
    contents: PresetContentConfig[];
}

const DEFAULT_MACHINE_EXTERNAL_ID_CONTENT: PresetContentConfig = {
    type: ContentType.MACHINE_EXTERNAL_ID,
    textConfig: {
        fontSize: 30,
        color: "#000000",
        align: AlignmentEnum.CENTER,
        position: PositionEnum.TOP,
        marginOffsetX: 0,
        marginOffsetY: 15,
    },
};

export const PRESETS: Preset[] = [
    {
        name: "Default Machine external_id",
        heightRatio: 1,
        contents: [DEFAULT_MACHINE_EXTERNAL_ID_CONTENT],
    },
    {
        name: "Machine external_id + Skeniraj me za račun",
        heightRatio: 1.5,
        contents: [
            DEFAULT_MACHINE_EXTERNAL_ID_CONTENT,
            {
                type: ContentType.STATIC,
                value: "Skeniraj me za račun",
                textConfig: {
                    fontSize: 30,
                    color: "red",
                    align: AlignmentEnum.CENTER,
                    position: PositionEnum.BOTTOM,
                    marginOffsetX: 0,
                    marginOffsetY: 5,
                },
            },
        ],
    },
];
