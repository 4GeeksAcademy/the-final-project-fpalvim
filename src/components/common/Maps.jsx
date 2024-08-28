import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MyContext } from '../context/MyContext';
import MapSearchBar from './MapSearchBar';
const Maps = () => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { users } = useContext(MyContext)
  const loggedInUserId = 1;
  
  useEffect(() => {
    const fetchAllCoordinates = async () => {
      const allMarkers = await Promise.all(
        users.map(async (user) => {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${user.address}`);
          const data = await response.json();
          if (data && data.length > 0) {
            return {
              id: user.id,
              username: user.username,
              position: [data[0].lat, data[0].lon],
              profile_type: user.profile_type,
              profile_picture: user.profile_picture
            };
          }
          return null;
        })
      );
      const validMarkers = allMarkers.filter(marker => marker !== null);
      setMarkers(validMarkers);
      const loggedInUserMarker = validMarkers.find(marker => marker.id === loggedInUserId);
      if (loggedInUserMarker) {
        setPosition(loggedInUserMarker.position);
      }
    };
    fetchAllCoordinates();
  }, [users, loggedInUserId]);
  if (!position) {
    return <div className="d-flex justify-content-center p-5 my-5">
    <div className="spinner-border" role="status"></div>
  </div>
  }
  return (
    <div>
      <MapContainer center={position} zoom={13} style={{zIndex: 2, height: "800px", width: "100%" }}>
      
        <TileLayer
          style={{zIndex: 3}}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup className='marker-popup'>
            <img src={marker.profile_picture} className="map-picture" alt="..."></img>
              <Link to={`/profilepage/${marker.id}`}>
              <button className="visit-acc-button">{marker.username}</button>
              </Link>
              <h6 className="marker-profile-type d-flex justify-content-center">{marker.profile_type}</h6>


            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default Maps;


