import request from '../api/requestNodeServer';
import { Region } from '../types';

export const addRegion = async (data: Region) => {
    try {
        const res = request.post('region/add', data, {
            headers: {
                'Authentication-Token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg4MSwiYXBwIjoibWlkdm4iLCJsZXZlbCI6MCwiY29tSUQiOi0xLCJpYXQiOjE3MTg3NzczMTEsImV4cCI6MTcxOTAzNjUxMX0.p10zlGeUX1LdpzD8IIN1I7ribSdjFHaTRZ8lhj7ZGok',
            },
        });
        return res;
    } catch (error) {}
};

// const getRecord = async () => {
//     try {
//     } catch (error) {}
// };

export const getRegion = async () => {
    try {
        const res = await request.get('region/get', {
            headers: {
                'Authentication-Token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg4MSwiYXBwIjoibWlkdm4iLCJsZXZlbCI6MCwiY29tSUQiOi0xLCJpYXQiOjE3MTg3NzczMTEsImV4cCI6MTcxOTAzNjUxMX0.p10zlGeUX1LdpzD8IIN1I7ribSdjFHaTRZ8lhj7ZGok',
            },
        });
        return res?.data?.data;
    } catch (error) {}
};
