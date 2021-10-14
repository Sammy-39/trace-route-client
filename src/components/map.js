import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

const Map = () =>{

    return (
      <MapContainer center={[38.8937, -77.0148]} zoom={11}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  }
  
  export default Map