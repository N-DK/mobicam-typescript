import React, { useMemo } from 'react';
import { MapContainer } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

const MapWrapper: React.FC<{
    children: React.ReactNode;
    center: [number, number];
}> = ({ children, center }) => {
    const googleLayer = useMemo(
        () => (
            <ReactLeafletGoogleLayer
                apiKey="AIzaSyA8A9yPeigR3I485ayAHKniugLw3OqXlS4"
                type={'satellite'}
            />
        ),
        [],
    );

    const mapContainer = useMemo(
        () => (
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
            >
                {googleLayer}
                {children}
            </MapContainer>
        ),
        [center, googleLayer, children],
    );

    return <div className="h-full">{mapContainer}</div>;
};

export default MapWrapper;
