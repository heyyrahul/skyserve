// DrawMap.jsx
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { EditControl } from 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const DrawMap = () => {
  const mapRef = useRef();

  // Function to fit map bounds to drawn items when created
  const fitBounds = (e) => {
    const map = mapRef.current;
    if (map && e.layer) {
      map.fitBounds(e.layer.getBounds());
    }
  };

  // Custom EditComponent that fits bounds after shape creation
  const CustomEditControl = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.on('draw:created', fitBounds);
      return () => {
        map.off('draw:created', fitBounds);
      };
    }, [map]);
    return (
      <EditControl
        position={position}
        edit={{
          remove: true,
        }}
        draw={{
          rectangle: true,
          circle: true,
          polygon: true,
          polyline: true,
          marker: true,
        }}
      />
    );
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      ref={mapRef} 
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CustomEditControl position="topright" /> 
    </MapContainer>
  );
};

export default DrawMap;
