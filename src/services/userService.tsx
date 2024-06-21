import request from '../api/requestNodeServer';
import { Region } from '../types';

const TOKEN: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg4MSwiYXBwIjoibWlkdm4iLCJsZXZlbCI6MCwiY29tSUQiOi0xLCJpYXQiOjE3MTg3NzczMTEsImV4cCI6MTcxOTAzNjUxMX0.p10zlGeUX1LdpzD8IIN1I7ribSdjFHaTRZ8lhj7ZGok';

export const addRegion = async (data: Region) => {
    try {
        const res = request.post('region/add', data, {
            headers: {
                'Authentication-Token': TOKEN,
            },
        });
        return res;
    } catch (error) {}
};

export const getRecord = async () => {
    try {
        const res = await request.get('region/get/record?limit=10', {
            headers: {
                'Authentication-Token': TOKEN,
            },
        });
        return res?.data?.data;
    } catch (error) {}
};

export const getRegion = async () => {
    try {
        const res = await request.get('region/get', {
            headers: {
                'Authentication-Token': TOKEN,
            },
        });
        return res?.data?.data;
    } catch (error) {}
};

export const deleteRegion = async (_id: string) => {
    try {
        const res = await request.patch(
            `region/delete?id=${_id}`,
            {},
            {
                headers: {
                    'Authentication-Token': TOKEN,
                },
            },
        );
        return res;
    } catch (error) {}
};

export const updateRegion = async (data: any) => {
    try {
        const res = await request.patch(
            'region/edit',
            { ...data },
            {
                headers: {
                    'Authentication-Token': TOKEN,
                },
            },
        );
        return res;
    } catch (error) {}
};
