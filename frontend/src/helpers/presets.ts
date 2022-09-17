enum PositionEnum {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
}

enum TextType {
    MACHINE_EXTERNAL_ID = "external-id",
    STATIC = "static",
}

interface PresetContentConfig {
    type: TextType;
    fontSize: number;
    marginOffset: number;
    color: string;
    position?: PositionEnum;
    value?: string;
}

export interface Preset {
    name: string;
    heightRatio?: number;
    topContent?: PresetContentConfig;
    bottomContent?: PresetContentConfig;
}

const DEFAULT_MACHINE_EXTERNAL_ID_CONTENT: PresetContentConfig = {
    type: TextType.MACHINE_EXTERNAL_ID,
    fontSize: 30,
    color: "#000000",
    position: PositionEnum.TOP,
    marginOffset: 5,
};

export const PRESETS: Preset[] = [
    {
        name: "Default Machine external_id",
        heightRatio: 1,
        topContent: DEFAULT_MACHINE_EXTERNAL_ID_CONTENT,
    },
    {
        name: "Machine external_id + Skeniraj me za račun",
        heightRatio: 1.5,
        topContent: DEFAULT_MACHINE_EXTERNAL_ID_CONTENT,
        bottomContent: {
            type: TextType.STATIC,
            value: "Skeniraj me za račun",
            fontSize: 30,
            color: "#000000",
            position: PositionEnum.BOTTOM,
            marginOffset: 5,
        },
    },
];
