import { useNavigate } from "react-router-dom";
import missingImage from "../../assets/image-missing.png";
import editImage from "../../assets/Edit.png";
import "./styles.css";


export default function Card({post}){
    const pathImage = import.meta.env.VITE_API_URL + "imgs/";
    const nav = useNavigate();

    
    const handleClick = ()=>{

        nav(`/editarpost/${post.id}`, { state: { id: post.id } });
    }

    return (
        <>
            <div className="card-div">
                <span className="card-title">{post.title}</span>
                <div className="image-div">
                    <img src={post.image ? pathImage + post.image : missingImage} alt="Imagem do post" id="postImage"/>
                    <img src={editImage} alt="icone editar" id="editImage" onClick={handleClick}/>
                </div>
                <span className="card-org-name">{post.content}</span>
                <div className="card-date">
                    <span className="date">05/11/2023</span>
                    <span className="hours">Dom, 05:00</span>
                </div>
            </div>
        </>
    )
}