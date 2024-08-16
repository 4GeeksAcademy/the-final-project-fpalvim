import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MapSearchBar from "../common/MapSearchBar";

const Maps = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position]);
    
    return null;
  };
  
  return (
    <div>
    <MapSearchBar onSelect={(coords) => setPosition(coords)}/>
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <Link to= {`/profilepage`}><button>click to see more details</button></Link>
        </Popup>
      </Marker>
      <RecenterMap position={position} />
    </MapContainer>
    </div>
  );
};

export default Maps;