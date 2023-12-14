import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Post } from "../../utils/types/Post";
import { User } from "../../utils/types/User";

export default function PostDetail() {
    const [post, setPost] = useState<Post>();
    const [owner, setOwner] = useState<User>();
    const pathImage = import.meta.env.VITE_API_URL + "imgs/";
    let {postId} = useParams();

    async function getPost(id:string | undefined){
        const postData = await api.get(`/posts/${id}`);

        const userData = await api.get(`/users/idsearch/${postData.data.userId}`);

        setPost(postData.data);
        setOwner(userData.data);
    }

    useEffect(() => {
        getPost(postId)
    }, [])

    return (
        <>
            <div className='post-detail-body'>
                {post ? (
                    <>
                        <div id="post-detail-header">
                            <span id="post-detail-title">{post.title}</span>
                            <span id="post-detail-category">{}</span>
                            <span id="post-detail-favorite-icon"></span>
                        </div>

                        <img id="post-detail-image"src={pathImage + post.image}/>

                        <div id="post-detail-author">
                            <img id="post-detail-author-image" src={pathImage + owner?.image}/>
                            <span id="post-detail-author-name">{owner?.username}</span>
                        </div>

                        <p id="post-detail-content">
                            {post.content}
                        </p>
                    </>
                ) : (
                    <p>:ashdaushdq</p>
                )}
            </div>
        </>

    );
}
