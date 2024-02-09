import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from './Button';

const GoogleMap = ({ apiKey }) => {
    const [mapType, setMapType] = useState('roadmap');

    const defaultProps = {
        center: {
            lat: 44.620862,
            lng: 21.187754
        },
        zoom: 15
    };

    const handleMapTypeChange = (newType) => {
        setMapType(newType);
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Button text="Map" onClick={() => handleMapTypeChange('roadmap')} />
                <span style={{ marginLeft: '10px' }} />
                <Button text="Satelite" onClick={() => handleMapTypeChange('satellite')} />
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    mapTypeId: mapType
                }}
            >
                <div
                    lat={44.620862}
                    lng={21.187754}
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'red',
                        borderRadius: '50%'
                    }}
                ></div>
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMap;
