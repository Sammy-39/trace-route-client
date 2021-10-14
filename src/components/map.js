import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

const Map = ({ locations }) =>{

  return (
    <MapContainer center={[38.8937, -77.0148]} zoom={11}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        locations.map((loc,index)=>(
          <Marker
            key={loc.properties.title+index}
            position={[
              loc.geometry.coordinates[1],
              loc.geometry.coordinates[0]
            ]}
          >
            <Tooltip> 
              {loc.properties.description} <br />
              {loc.properties.address}
            </Tooltip>
          </Marker>
        ))
      }
    </MapContainer>
  );
}

export default Map