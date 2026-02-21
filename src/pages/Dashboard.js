import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const Dashboard = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, name: "Parking A", lat: 28.6145, lng: 77.2095, status: "Available" },
    { id: 2, name: "Parking B", lat: 28.6155, lng: 77.2105, status: "Full" },
    { id: 3, name: "Parking C", lat: 28.6125, lng: 77.2085, status: "Available" },
  ]);

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const bookSpot = (id) => {
    const updatedSpots = parkingSpots.map((spot) =>
      spot.id === id ? { ...spot, status: "Full" } : spot
    );
    setParkingSpots(updatedSpots);
    alert("Parking booked successfully!");
    setSelectedSpot(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 Smart Parking Finder</h2>

      <button onClick={findMyLocation} style={{ marginBottom: "10px" }}>
        📍 Find My Location
      </button>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
        >
          {/* User Location Marker */}
          <Marker position={currentLocation} />

          {/* Parking Spot Markers */}
          {parkingSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}

          {/* Info Window */}
          {selectedSpot && (
            <InfoWindow
              position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
              onCloseClick={() => setSelectedSpot(null)}
            >
              <div>
                <h4>{selectedSpot.name}</h4>
                <p>Status: {selectedSpot.status}</p>

                {selectedSpot.status === "Available" && (
                  <button onClick={() => bookSpot(selectedSpot.id)}>
                    Book Now
                  </button>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Dashboard;