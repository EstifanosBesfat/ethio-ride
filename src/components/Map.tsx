import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// 1. Fix for missing marker icons in React Leaflet (A known bug)
// We use a custom URL for the marker icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // Size of the pin
});

export default function Map() {
  const position: number[] = [9.0192, 38.7525];

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {" "}
      {/* Force Full Screen */}
      <MapContainer
        center={[9.0192, 38.7525]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }} // Force Map to fill container
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[8.9806, 38.7578]} icon={customIcon}>
          <Popup>Bole Airport</Popup>
        </Marker>
      </MapContainer>
      {/* UI Overlay */}
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
