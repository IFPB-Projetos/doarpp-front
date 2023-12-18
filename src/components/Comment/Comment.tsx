import { Link } from "react-router-dom";
import user from "../../assets/userpng.png";
import "./style.css";
import { TypeComment } from "../../utils/types/Comment";

type Props = {
    comment: TypeComment
}

export default function Comment({comment}:Props){
    return (
        <div className="comment-body">
            <Link to={`/perfil/robson`} className="comment-profile-picture">
                <img src={user} alt="Foto do usuário"/>
            </Link>
            <div className="comment-text">
                <span className="comment-author">{comment.user.name}</span>
                <p className="comment-content">
                    comment.content
                </p>
            </div>

        </div>
    )
}