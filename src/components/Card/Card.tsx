import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import missingImage from "../../assets/image-missing.png";
import editImage from "../../assets/Edit.png";
import { Post } from "../../utils/types/Post";
import heart from "../../assets/Heart.png";
import favorite from "../../assets/Favorite.png";
import { api } from "../../utils/api";

import "./styles.css";

interface CardPost {
  post: Post;
}

export default function Card({ post }: CardPost) {
  const pathImage = import.meta.env.VITE_API_URL + "imgs/";
  const nav = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const dadoLocalUser = localStorage.getItem("user") || "";
  const user = JSON.parse(dadoLocalUser);

  useEffect(() => {
    checkIsFavorite();
  }, []);

  const handleClick = () => {
    nav(`/editarpost/${post.id}`, { state: { id: post.id } });
  };

  const handleImageClick = () => {
    nav(`detalhes/${post.id}`);
  };

  const handleFavoriteClick = async () => {
    try {
        if (isFavorite) {
          await api.delete(`/favorite/${post.id}`);
        }
        else {
            await api.post("/favorite", {
                userId: user.id, 
                postId: post.id,
            });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar:", error);
    }
  };

  const checkIsFavorite = async () => {
    try {
      const response = await api.get(`/favorite/user/${user.id}`);
  
      const favorites = response.data;
      const isPostFavorite = favorites.some((fav: any) => fav.postId === post.id);
  
      setIsFavorite(isPostFavorite);
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
    }
  };

  return (
    <>
      <div className="card-div">
        <span className="card-title">{post.title}</span>
        <div className="image-div">
          <img
            src={post.image ? pathImage + post.image : missingImage}
            alt="Imagem do post"
            id="postImage"
            onClick={handleImageClick}
          />
          <div className="icons-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={editImage}
              alt="icone editar"
              id="editImage"
              onClick={handleClick}
            />
            <img
              src={isFavorite ? heart : favorite}
              alt="icone favorito"
              onClick={handleFavoriteClick}
            />
          </div>
        </div>

        <span className="card-org-name">{post.content}</span>
        <div className="card-date">
          <span className="date">05/11/2023</span>
          <span className="hours">Dom, 05:00</span>
        </div>
      </div>
    </>
  );
}
