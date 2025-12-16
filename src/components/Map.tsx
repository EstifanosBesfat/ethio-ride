import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; // <--- Added useMap
import { Icon } from "leaflet";
import { useState } from "react";
import { Navigation } from "lucide-react"; // Make sure you installed lucide-react

// 1. Custom Icons
const taxiIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

const userIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png", // Different icon for YOU
  iconSize: [38, 38],
});

// 2. HELPER COMPONENT: This handles the camera movement
// We must put this INSIDE MapContainer to use the 'useMap' hook
function FlyToLocation({ coords }: { coords: [number, number] | null }) {
  const map = useMap(); // Access the Leaflet engine

  if (coords) {
    map.flyTo(coords, 15, { duration: 2 }); // Zoom level 15, Animation 2 seconds
  }
  return null; // This component renders nothing visually
}

export default function Map() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );

  // 3. The Logic: Ask Browser for GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // Ask for permission and get coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        alert("Unable to retrieve your location. Allow GPS access!");
      }
    );
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }} className="relative">
      <MapContainer
        center={[9.0192, 38.7525]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Static Taxi Marker */}
        <Marker position={[8.9806, 38.7578]} icon={taxiIcon}>
          <Popup>Available Taxi</Popup>
        </Marker>

        {/* YOUR Marker (Only shows if we found you) */}
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* The Camera Controller */}
        <FlyToLocation coords={userPosition} />
      </MapContainer>

      {/* FLOATING BUTTON: Locate Me */}
      <button
        onClick={handleLocateMe}
        className="absolute bottom-32 right-4 z-[1000] bg-white p-3 rounded-full shadow-xl hover:bg-gray-100 text-blue-600"
      >
        <Navigation size={24} />
      </button>

      {/* Input Overlay */}
      <div className="absolute bottom-10 left-4 right-4 z-[1000] bg-white p-4 rounded-xl shadow-xl">
        <h2 className="font-bold text-lg">Where to?</h2>
        <input
          placeholder="Enter destination..."
          className="w-full bg-gray-100 p-3 rounded-lg mt-2 outline-none"
        />
      </div>
    </div>
  );
}
