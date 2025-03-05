import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIcon from "../../ajawed.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CameraMap() {
  return (
    <MapContainer
    center={[18.2167, 42.5000]} // Abha location
    zoom={13} // Fixed zoom level
    style={{ height: "500px", width: "100%" }}
    zoomControl={false} // Disable default zoom controls
    maxZoom={15}

    >
      {/* ✅ Stadia Maps Alidade Smooth Dark Layer */}
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> 
        &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> 
        &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Example Camera Marker */}
      <Marker position={[18.2167, 42.5000]} icon={customIcon}>
        <Popup>📍 موقع الكاميرا في أبها</Popup>
      </Marker>
    </MapContainer>
  );
}
