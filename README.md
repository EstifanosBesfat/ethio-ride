# 🚖 EthioRide - Real-Time Tracking App

EthioRide is a modern ride-hailing interface that demonstrates **Real-Time Location Tracking** using WebSockets. It replicates the core tracking experience of apps like Uber or Feres, allowing users to see their location and track a driver moving on the map instantly without page refreshes.

## 🔗 Live Demo
**[Click here to view the live app](https://ethio-ride.vercel.app/)**

## ✨ Key Features
- **📍 Real-Time Driver Tracking:** Uses **Supabase Realtime** (WebSockets) to update driver positions instantly on the map as the database changes.
- **🗺️ Interactive Map:** Built with **Leaflet & OpenStreetMap** for a smooth, cost-free mapping experience centered on Addis Ababa.
- **📡 Geolocation:** Integrated with the browser's **Geolocation API** to locate the user with a single click and animate the camera ("FlyTo") to their position.
- **⚡ Reactive UI:** React state manages marker positions, ensuring 60fps smooth updates when data is received.
- **📱 Responsive Design:** Fully optimized for mobile devices using **Tailwind CSS**.

## 🛠️ Tech Stack
- **Frontend:** React (Vite), TypeScript
- **Mapping Engine:** React Leaflet, OpenStreetMap
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Backend:** Supabase (PostgreSQL)
- **Real-Time Engine:** Supabase Realtime (Postgres Changes)

## 🏗️ Architecture
The app follows a **Subscriber-Publisher** pattern:
1.  **The Database (Publisher):** Holds the driver's coordinates (`lat`, `lng`).
2.  **The Client (Subscriber):** The React app opens a WebSocket connection to Supabase.
3.  **The Trigger:** When a row in the `drivers` table is updated, Supabase broadcasts the change.
4.  **The Update:** The React client receives the payload and updates the Map Marker position instantly.

## 📦 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ethio-ride.git
   cd ethio-ride
2. **Install dependencies**
   ```bash
   npm install
3. **Configure Environemt Variables**
   Create a .env.local file in the root directory and add your Supabase credentials:
   ```bash
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. **Run the App**
    ```bash
        npm run dev
5. **🗄️ Database Schema**
   The app requires a Supabase table named drivers with Realtime enabled:
     ```bash
      Column	Type	  Description
      id	    int8	  Primary Key
      name	text	  Driver Name
      lat	float8	   Latitude
      lng	float8	   Longitude
**👨‍💻 Author**
Built by Estifanos Besfat as a demonstration of Real-Time geospatial technologies.
