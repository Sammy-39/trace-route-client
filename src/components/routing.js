import { useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine";


const Routing = ({ locations }) =>{
    const map = useMap()

    if(locations.length===0){
        map.eachLayer(layer=>{
            if(!layer.getAttribution()){
                map.removeLayer(layer)
            }
        })
    }
    
    if(locations.length>1){
        let RoutingEngine = new L.Routing.Control({
            waypoints: locations.map(loc=>(
                L.latLng(loc.geometry.coordinates[1], loc.geometry.coordinates[0])
            )),
            fitSelectedRoutes: false,
            lineOptions: {
                styles: [
                    {color: 'black', opacity: 0.15, weight: 9}, 
                    {color: 'white', opacity: 0.8, weight: 6}, 
                    {color: 'blue', opacity: 1, weight: 2}
                ]
            }
        }).addTo(map)

        RoutingEngine.hide()
    }

    return null
}

export default Routing