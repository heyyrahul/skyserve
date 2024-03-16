// import React, { useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// import { EditControl } from 'leaflet-draw';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';

// const DrawMap = () => {
//   const mapRef = useRef();

//   // Function to fit map
//   const fitBounds = (e) => {
//     const map = mapRef.current;
//     if (map && e.layer) {
//       map.fitBounds(e.layer.getBounds());
//     }
//   };

//   // Custom EditComponent
//   const CustomEditControl = ({ position }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.on('draw:created', fitBounds);
//       return () => {
//         map.off('draw:created', fitBounds);
//       };
//     }, [map]);
//     return (
//       <EditControl
//         position={position}
//         edit={{
//           remove: true,
//         }}
//         draw={{
//           rectangle: true,
//           circle: true,
//           polygon: true,
//           polyline: true,
//           marker: true,
//         }}
//       />
//     );
//   };

//   return (
//     <MapContainer
//       center={[51.505, -0.09]}
//       zoom={13}
//       style={{ height: '400px', width: '100%' }}
//       ref={mapRef}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <CustomEditControl position="topright" />
//     </MapContainer>
    
//   );
// };

// export default DrawMap;



import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-editable';
import 'leaflet/dist/leaflet.css';

function DrawMap() {
    useEffect(() => {
        const map = L.map('map', { editable: true }).setView([43.1249, 1.254], 9);
        const osmlayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
        });
        osmlayer.addTo(map);

        // Edit single feature 
        const polyline = L.polyline([
            [43.1249, 1.254],
            [43.55, 1.28]
        ], { color: 'red' }).addTo(map);

        polyline.enableEdit();

        // GeoJSON load
        const geojsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                switch (feature.geometry.type) {
                    case "Point": return { color: 'blue' }
                    case "LineString": return { color: 'red' }
                    case "Polygon": return { color: "green", fillColor: 'yellow' }
                    default: return { color: 'black' } // Add default style
                }
            }
        }).addTo(map);

        map.fitBounds(geojsonLayer.getBounds());

        // Enable edit geojson
        geojsonLayer.eachLayer(function (layer) {
            layer.enableEdit()
        });

        // Save the edited geojson
        geojsonLayer.eachLayer(function (layer) {
            const popupContent = "Name: " + layer.feature.properties.name;
            layer.bindPopup(popupContent);
        });

        // Save the edited geojson
        map.on('editable:editing', function (e) {
            // Add popup to the edited layer to download the edited geojson
            e.layer.bindPopup('<a href="data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geojsonLayer.toGeoJSON())) + '" download="geojson.json">Download GeoJSON</a>');
        });

        // Clean up function
        return () => {
            map.remove();
        };
    }); 

    return (
        <div id="map" style={{ height: '400px' }}></div>
    );
}

export default DrawMap;
