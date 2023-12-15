import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Dispatch, SetStateAction } from "react";
import Leaflet, { LatLngExpression } from "leaflet";
import "./styles.css";
import LocationMarker from "../LocationMarker/LocationMarker";

type Position = {
    lat: number,
    lng: number
}

type Props = {
    position: Position,
    setPosition: Dispatch<SetStateAction<Position>>
}

export default function InputPosition({position, setPosition}:Props){
    return (
        <>
            <div id="map-body">
                <MapContainer center={[-6.88634, -38.5614]} zoom={20} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker setPosition={setPosition}/>
                    {position ? (
                        <Marker position={{lat: position.lat, lng: position.lng}}/>
                    )
                    :
                    null
                    }
                </MapContainer>
            </div>
        </>
    )
}