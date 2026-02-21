import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 28.6139,
    lng: 77.2090,
  });

  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, name: "Parking A", lat: 28.6145, lng: 77.2095, status: "Available" },
    { id: 2, name: "Parking B", lat: 28.6155, lng: 77.2105, status: "Full" },
    { id: 3, name: "Parking C", lat: 28.6125, lng: 77.2080, status: "Available" },
  ]);

  const handleFindLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleBooking = (id) => {
    const updatedSpots = parkingSpots.map((spot) =>
      spot.id === id && spot.status === "Available"
        ? { ...spot, status: "Full" }
        : spot
    );
    setParkingSpots(updatedSpots);
    alert("Parking Spot Booked!");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🚗 Smart Parking Finder</h1>

      <button
        onClick={handleFindLocation}
        style={{
          padding: "10px 20px",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        📍 Find My Location
      </button>

      <LoadScript googleMapsApiKey="AIzaSyA0UCOpGSRmPkiIXaIp-dLciVR1Pm2WFNs">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
        >
          <Marker position={currentLocation} label="You" />

          {parkingSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              label={spot.name}
              onClick={() =>
                spot.status === "Available"
                  ? handleBooking(spot.id)
                  : alert("Parking Full!")
              }
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <div style={{ marginTop: "20px" }}>
        <h2>Parking Status</h2>
        {parkingSpots.map((spot) => (
          <p key={spot.id}>
            {spot.name} -{" "}
            <span
              style={{
                color: spot.status === "Available" ? "green" : "red",
              }}
            >
              {spot.status}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;