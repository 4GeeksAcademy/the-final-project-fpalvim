import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MyContext } from '../context/MyContext';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Maps = () => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { users } = useContext(MyContext);
  const loggedInUserId = localStorage.getItem("userId");
  const apiKey = "7dc0f065e04d40339d145a08e98b49a9"
  const getCoordinates = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${address}`);
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return {
          lat: data.results[0].geometry.lat,
          lon: data.results[0].geometry.lng
        };
      } else {
        console.error(`No results found for ${address}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${address}:`, error);
      return null;
    }
  };
  useEffect(() => {
    const fetchAllCoordinates = async () => {
      const allMarkers = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const coordinates = await getCoordinates(user.address);
        if (coordinates) {
          allMarkers.push({
            id: user.id,
            username: user.username,
            position: [coordinates.lat, coordinates.lon],
            profile_type: user.profile_type,
            profile_picture: user.profile_picture
          });
        }
        if (i < users.length - 1) {
          await delay(500);
        }
      }
      setMarkers(allMarkers);
      const loggedInUserMarker = allMarkers.find(marker => marker.id == Number(loggedInUserId));
      if (loggedInUserMarker) {
        setPosition(loggedInUserMarker.position);
      }
      console.log(loggedInUserMarker);
    };
    fetchAllCoordinates();
  }, [users, loggedInUserId]);
  console.log(position);
  if (!position) {
    return (
      <div className="d-flex justify-content-center p-5 my-5">
        <div className="spinner-border" style={{color:"pink"}} role="status"></div>
      </div>
    );
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
            <Popup className='marker-popup d-flex'>
              <div className='marker-popup-top d-flex margin-0 margin-auto align-items-center justify-content-between'>
                <img src={marker.profile_picture} className="map-picture" alt="..."></img>
                <Link to={`/profilepage/${marker.id}`}>
                  <button className="button-78">{marker.username}</button>
                </Link>
                
              </div>
              <hr class="hr" />
              <div>
                <h6 className="marker-profile-type d-flex justify-content-center">{marker.profile_type}</h6>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>h
    </div>
  );
};

export default Maps;