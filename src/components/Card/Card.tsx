import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import missingImage from "../../assets/image-missing.png";
import editImage from "../../assets/Edit.png";
import { Post } from "../../utils/types/Post";
import heart from "../../assets/Heart.png";
import favorite from "../../assets/Favorite.png";
import { api } from "../../utils/api";
import "./styles.css";
import { useAuth } from "../../contexts/auth";

interface CardPost {
  post: Post;
}

export default function Card({ post }: CardPost) {
  const pathImage = import.meta.env.VITE_API_URL + "imgs/";
  const nav = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const {user} = useAuth();

  function formatDate(type: string, date:Date){
    switch (type){
      case "fullDate":
        let fullDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        return fullDate;

      case "dayNameAndNumber":
        let name = `${date.toLocaleDateString([], {weekday: "short"})}`
        let formatedName = name.charAt(0).toUpperCase() + name.slice(1);


        let hour = `${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}`

        let dayNameAndNumber = `${formatedName.replace(".", ", ") + hour}`
        return dayNameAndNumber
    }
  }

  const date = new Date(post.createdAt);
  const dateOfCreation = formatDate("fullDate", date)
  const dayCreated = formatDate("dayNameAndNumber", date);
  
  useEffect(() => {
    checkIsFavorite();
  }, [user]);

  const handleClick = () => {
    nav(`/editarpost/${post.id}`, { state: { id: post.id } });
  };

  const handleImageClick = () => {
    nav(`/detalhes/${post.id}`);
  };

  const handleFavoriteClick = async () => {
    try {
      if(user){
        if (isFavorite) {
          await api.delete(`/favorite/${post.id}`);
        } else {
          await api.post("/favorite", {
            userId: user.id,
            postId: post.id,
          });
        }

        setAnimationClass("animate-heart");

        setTimeout(() => {
          setAnimationClass("");
        }, 1000);

        setIsFavorite(!isFavorite);
    } else return
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar:", error);
    }
  };

  const checkIsFavorite = async () => {
    try {
      if(user){
        const response = await api.get(`/favorite/user/${user.id}`);
    
        const favorites = response.data;
        const isPostFavorite = favorites.some((fav: any) => fav.postId === post.id);
    
        setIsFavorite(isPostFavorite);
      } else return
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
              className={`${animationClass}`}
            />
          </div>
        </div>

        <span className="card-org-name">{user?.name}</span>
        <div className="card-date">
          <span className="date">{dateOfCreation}</span>
          <span className="hours">{dayCreated}</span>
        </div>
      </div>
    </>
  );
}
