import missingImage from "../../assets/image-missing.png";
import "./styles.css";

export default function Card(){
    return (
        <>
            <div className="card-div">
                <span className="card-title">Titulo</span>
                <div className="image-div">
                    <img src={missingImage} alt="Imagem do post"/>
                </div>
                <span className="card-org-name">Nome</span>
                <div className="card-date">
                    <span className="date">05/11/2023</span>
                    <span className="hours">Dom, 05:00</span>
                </div>
            </div>
        </>
    )
}