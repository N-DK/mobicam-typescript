import request from '../api/request';

export const getListVehicles = async () => {
    try {
        const res = await request.post(
            'mLvehi',
            {},
            {
                headers: {
                    'X-Mobicam-Token':
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ1LCJhcHAiOiJtaWR2biIsImxldmVsIjowLCJjb21JRCI6LTEsImlhdCI6MTcxODY4NDI3OSwiZXhwIjoxNzE4OTQzNDc5fQ.MgG14LCLKMGWSuK0xfrFZXEvRW7JXpXE6Px7jpkYMnM',
                },
            },
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
