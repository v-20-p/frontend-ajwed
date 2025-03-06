import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet

import markerShadow from "leaflet/dist/images/marker-shadow.png";
import redCamera from "../assets/map-marker-red.png"
import greenCamera from "../assets/map-marker-green.png"
import grayCamera from "../assets/map-marker-gray.png"



interface Cameras{

    id: number;
    traffic_status: string;
    battery_percentage: number;
    is_connected: boolean;
    latitude: number;
    longitude: number;

}
interface props{
  camera:Cameras[]
}

const redIcon = new L.Icon({
  iconUrl: redCamera,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const greenIcon = new L.Icon({
  iconUrl: greenCamera,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const grayIcon = new L.Icon({
  iconUrl: grayCamera,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


export default function CameraMap({camera}:props) {
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

      {camera.map((v) => {
        const cameraIcon =
          v.is_connected
            ? v.traffic_status === "green"
              ? greenIcon
              : redIcon
            : grayIcon;

        return (
          <Marker
            key={v.id}
            position={[v.latitude, v.longitude]}
            icon={cameraIcon}
          >
            <Popup>
              📍 موقع الكاميرا في أبها
              <br />
              <strong>Status:</strong> {v.traffic_status}
              <br />
              <strong>Battery:</strong> {v.battery_percentage}%
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

