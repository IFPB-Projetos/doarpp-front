import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./styles.css";
import { api } from "../../utils/api";

export default function Feed() {
    const [posts, setPosts] = useState<any[]>([]);

    async function getPosts() {
        const response = await api.get("/posts");

        setPosts(response.data);
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <div id="feed-body">
                <h2>Filtrar!</h2>
                <form className="filter">
                    <div>
                        <label>Localidade:</label>
                        <input placeholder="localidade"></input>
                    </div>

                    <div>
                        <label>Categorias:</label>
                        <input placeholder="localização" />
                    </div>
                </form>

                <h2>Ajude!</h2>
                <div className="posts-div">
                    {!posts && (
                        <p>Não existem posts</p>
                    )}
                    {posts.map((post) => (
                        <Card post={post} key={post.id}/>
                    ))}
                </div>
            </div>
        </>
    )
}
