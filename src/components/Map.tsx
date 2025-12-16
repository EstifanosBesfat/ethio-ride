import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useEffect } from 'react'; // <--- Added useEffect
import { Navigation } from 'lucide-react';
import { supabase } from '../lib/supabase'; // <--- Import Supabase

// ... (Keep your Icons and FlyToLocation component exactly the same) ...
// ... I am omitting them here to save space, but DO NOT DELETE THEM ...
const taxiIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38]
});
const userIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
  iconSize: [38, 38]
});
function FlyToLocation({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  if (coords) map.flyTo(coords, 15, { duration: 2 });
  return null;
}
// ... End of helper components ...


export default function Map() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  
  // 1. STATE: Where is the Taxi? (Start at Bole)
  const [taxiPosition, setTaxiPosition] = useState<[number, number]>([8.9806, 38.7578]);

  // 2. THE LISTENER (Realtime Logic)
  useEffect(() => {
    // A. Subscribe to the 'drivers' table
    const channel = supabase
      .channel('realtime:drivers') // Give the connection a name
      .on(
        'postgres_changes', // Listen for Database Changes
        { event: 'UPDATE', schema: 'public', table: 'drivers' }, // Filter: Only Updates on 'drivers'
        (payload) => {
          // B. This runs whenever Supabase shouts "Update!"
          console.log('Driver moved!', payload);
          const { lat, lng } = payload.new; // Get new coordinates
          setTaxiPosition([lat, lng]); // Update State -> Moves Marker
        }
      )
      .subscribe();

    // C. Cleanup: Hang up the phone when we leave the page
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLocateMe = () => {
     // ... (Keep your existing geolocation logic) ...
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }} className="relative">
      <MapContainer center={[9.0192, 38.7525]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 3. TAXI MARKER: Linked to State */}
        <Marker position={taxiPosition} icon={taxiIcon}>
          <Popup>Chala (Driver)</Popup>
        </Marker>

        {/* USER MARKER */}
        {userPosition && <Marker position={userPosition} icon={userIcon}><Popup>You</Popup></Marker>}

        <FlyToLocation coords={userPosition} />
      </MapContainer>

      {/* Buttons & UI... (Keep your existing UI) */}
      <button onClick={handleLocateMe} className="absolute bottom-32 right-4 z-[1000] bg-white p-3 rounded-full shadow-xl text-blue-600">
        <Navigation size={24} />
      </button>
    </div>
  );
}