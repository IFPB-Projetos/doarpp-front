import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Dispatch, SetStateAction, useState } from "react";
import Leaflet, { LatLngExpression } from "leaflet";
import "./styles.css";

type Position = {
    lat: number,
    lng: number
}

type Props = {
    setPosition: Dispatch<SetStateAction<Position>>
}

export default function LocationMarker({setPosition}:Props){
    useMapEvents({
        click(e) {
          setPosition({lat: e.latlng.lat, lng: e.latlng.lng})
        },
      });
      return false;
}