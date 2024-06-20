export type Region = {
    _id?: string;
    type: string;
    bounds?: number[][];
    color?: string;
    name: string;
    isInWarning: number;
    isOutWarning: number;
    vehicles?: string[];
    note?: string;
    isDelete?: boolean;
    center?: number[];
    radius?: number;
};
