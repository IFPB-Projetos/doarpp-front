import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles.css";
import { useAuth } from "../../contexts/auth";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { User } from "../../utils/types/User";

export default function Map(){
    const [users, setUsers] = useState<User[]>();

    async function getUsers(){
        const users = await api.get("/users");

        setUsers(users.data)
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <div id="map-body">
                <MapContainer center={[-6.88634, -38.5614]} zoom={20} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { users ? (

                        users.map((user) => (
                            <Marker position={{lat: user.location.coordinates[0], lng: user.location.coordinates[1]}} key={user.id}>
                                <Popup>TESTE</Popup>
                            </Marker>
                        ))
                    ): null}
                </MapContainer>
            </div>
        </>
    )
}