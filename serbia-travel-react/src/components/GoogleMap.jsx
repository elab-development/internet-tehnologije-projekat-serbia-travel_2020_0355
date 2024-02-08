import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ apiKey }) => {
    const defaultProps = {
        center: {
            lat: 44.620862,
            lng: 21.187754
        },
        zoom: 15
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            />

        </div>
    );
};

export default GoogleMap;
