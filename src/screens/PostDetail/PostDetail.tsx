import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Post } from "../../utils/types/Post";
import { User } from "../../utils/types/User";
import heart from "../../assets/Heart.png";
import favorite from "../../assets/Favorite.png"
import { useAuth } from "../../contexts/auth";
import Comment from "../../components/Comment/Comment";
import { TypeComment } from "../../utils/types/Comment";
import InputComment from "../../components/InputComment/InputComment";

export default function PostDetail() {
    const [post, setPost] = useState<Post>();
    const [owner, setOwner] = useState<User>();
    const pathImage = import.meta.env.VITE_API_URL + "imgs/";

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState("");

    const {user} = useAuth();
    const {postId} = useParams();

    async function getPost(id:string | undefined){
        const postData = await api.get(`/posts/${id}`);

        const userData = await api.get(`/users/idsearch/${postData.data.userId}`);

        setPost(postData.data);
        setOwner(userData.data);
    }
    
    const handleFavoriteClick = async () => {
        try {
          if(user){
            if (isFavorite) {
              await api.delete(`/favorite/${post?.id}`);
            } else {
              await api.post("/favorite", {
                userId: user.id,
                postId: post?.id,
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
            const isPostFavorite = favorites.some((fav: any) => fav.postId === postId);
        
            setIsFavorite(isPostFavorite);
          } else return
        } catch (error) {
          console.error("Erro ao verificar favorito:", error);
        }
      };


    useEffect(() => {
        getPost(postId);
        checkIsFavorite();
    }, [user, postId])

    return (
        <>
            <div className='post-detail-body'>
                {post && owner ? (
                    <>
                        <div id="post-detail-header">
                            <span id="post-detail-title">{post.title}</span>
                            <span id="post-detail-category">Categoria</span>
                            <span id="post-detail-favorite-icon">
                            <img
                                src={isFavorite ? heart : favorite}
                                alt="icone favorito"
                                onClick={handleFavoriteClick}
                                className={`${animationClass}`}
                                />
                            </span>
                        </div>

                        <img id="post-detail-image"src={pathImage + post.image}/>

                        <div id="post-detail-author">
                            <img id="post-detail-author-image" src={pathImage + owner.image}/>
                            <span id="post-detail-author-name">{owner.username}</span>
                        </div>

                        <p id="post-detail-content">
                            {post.content}
                        </p>

                        <div id="post-comments">
                          <div id="post-comments-add">
                            <InputComment userId={user ? user.id : "null"} postId={post.id}/>
                          </div>

                          {post.comments.length !== 0 ? (
                            <div id="post-comments-cards">
                              {post.comments.map((comment) => (
                                <Comment comment={comment} key={comment.id}/>
                              ))}
                            </div>
                          ): (
                            <span>Ainda não existem comentários</span>
                          )}
                        </div>
                    </>
                ) : (
                    <p>:ashdaushdq</p>
                )}
            </div>
        </>

    );
}
