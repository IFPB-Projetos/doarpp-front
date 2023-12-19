import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { api } from "../../utils/api";
import userIcon from "../../assets/userpng.png";
import editIcon from "../../assets/Edit.png";
import deleteIcon from "../../assets/Delete.png";
import "./style.css";
import { useAuth } from "../../contexts/auth";

export default function EditComment() {
  const nav = useNavigate();
  const location = useLocation();

  const {id} = useParams();
  const contentLocation = location.state?.contentLocation;

  const { signed } = useAuth();

  const [content, setContent] = useState(contentLocation);
  const [contentError, setContentError] = useState("");

    useEffect(() => {           
        if(!signed){
            nav("/login")
        }
    })

  const handleCancel = () => {
    nav("/");
  };

  const handleEditComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setContentError("");

    if (!content.trim()) {
      setContentError("Campo necessário!")
    }

    try {
      const response = await api.patch(`/comments/${id}`, {content});
      nav("/postagens");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="telaForm">
      <div className="frasePrincipalTelaMain">
        <form onSubmit={handleEditComment} id="edit-form">
            <span id="edit-header">Comentário</span>
            <textarea value={content} onChange={(event) => setContent(event.target.value)} name="content" id="edit-content"/>
            <div id="edit-buttons">
                <button><img src={deleteIcon} alt="Icone de deltar" onClick={handleCancel}/>Cancelar</button>
                <button type="submit" id="edit-button">Enviar</button>
            </div>
        </form>
      </div>
    </div>
  );
}
