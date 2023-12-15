import { Popup } from "react-leaflet";
import { User } from "../../utils/types/User";
import "./styles.css";
import { useNavigate } from "react-router-dom";

type Props = {
    user: User
}

export default function CustomPopup({user}:Props){
    const pathImage = import.meta.env.VITE_API_URL + "imgs/";

    const navigation = useNavigate()

    function sendToProfile(){
        navigation(`/perfil/${user.username}`);
    }

    return (
        <Popup className="custom-popup">
            <img src={pathImage + user.image} className="popup-img" onClick={sendToProfile}/>
            <span className="popup-name">{user.name}</span>
        </Popup>
    )
}