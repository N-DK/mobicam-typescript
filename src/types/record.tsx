export type Record = {
    _id: string;
    region_id: string;
    region_name: string;
    vid: string;
    dev_id: string;
    create_time: number;
    update_time: number;
    in_time: number | null;
    out_time: number | null;
    userId: number;
    isDelete: boolean;
};
