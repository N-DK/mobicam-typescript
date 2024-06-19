import request from '../api/request';

export const getListVehicles = async () => {
    try {
        const res = await request.post(
            'mLvehi',
            {},
            {
                headers: {
                    'X-Mobicam-Token':
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg4MSwiYXBwIjoibWlkdm4iLCJsZXZlbCI6MCwiY29tSUQiOi0xLCJpYXQiOjE3MTg3NzczMTEsImV4cCI6MTcxOTAzNjUxMX0.p10zlGeUX1LdpzD8IIN1I7ribSdjFHaTRZ8lhj7ZGok',
                },
            },
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
