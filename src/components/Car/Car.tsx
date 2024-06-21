import React, { useEffect, useMemo } from 'react';
import { Car as TypeCar } from '../../types';
import { getDivIcon } from '../../utils';
import { Marker, Popup, useMap } from 'react-leaflet';

type CarProps = {
    data: TypeCar;
    active?: boolean;
};

const Car: React.FC<CarProps> = React.memo(({ data, active }) => {
    const map = useMap();

    useEffect(() => {
        if (active) {
            map.setView([data.lat, data.lng], 18);
        }
    }, [active, map]);

    const icon = useMemo(() => {
        return getDivIcon(
            data?.dir,
            data?.speed === 0
                ? data?.accIO % 2 === 0
                    ? '#e74b3c'
                    : '#4397c9'
                : '#00aa9a',
            active !== undefined ? active : false,
        );
    }, [data?.dir, data?.speed, data?.accIO, active]);

    return (
        data && (
            <div className="transition-all">
                <Marker position={[data?.lat, data?.lng]} icon={icon}>
                    <Popup>{data?.name}</Popup>
                </Marker>
            </div>
        )
    );
});

export default Car;
