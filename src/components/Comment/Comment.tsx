import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/userpng.png";
import editIcon from "../../assets/Edit.png";
import deleteIcon from "../../assets/Delete.png";
import "./style.css";
import { TypeComment } from "../../utils/types/Comment";
import { api } from "../../utils/api";

type Props = {
    comment: TypeComment
}

export default function Comment({comment}:Props){
    const nav = useNavigate();

    async function handleDelete(){
        await api.delete(`/comments/${comment.id}`);
        window.location.reload()
    }

    const handleEdit = () => {
        nav(`/editarcomment/${comment.id}`, { state: { contentLocation: comment.content } });
      };
    

    return (
        <div className="comment-body">
            <div className="comment-imgs">
                <Link to={`/perfil/robson`}>
                    <img src={userIcon} alt="Foto do usuário" className="comment-profile-picture"/>
                </Link>
                <img src={editIcon} onClick={handleEdit}/>
                <img src={deleteIcon}  onClick={handleDelete}/>
            </div>

            <div className="comment-text">
                <span className="comment-author">{comment.user.name}</span>
                <p className="comment-content">
                    {comment.content}
                </p>
            </div>
        </div>
    )
}