import { FormEvent, useState } from "react";
import { api } from "../../utils/api";
import "./style.css";
import { useAuth } from "../../contexts/auth";

type Props = {
    postId: string
}

export default function InputComment({postId}:Props){
    const [content, setContent] = useState("");

    const {signed} = useAuth();

    async function handleCreateComment(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        try {
            await api.post("/comments/", {content, postId})
          } catch (err) {
            console.log(err)
          }
    }

    return (
        <form id="input-comment-body" onSubmit={handleCreateComment} method="POST">
            {signed ?
            <>
                <input type="hidden" value={postId} name="postId" />
                <textarea
                    placeholder="Comentário"
                    name="content"
                    id="input-comment-content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}/>
                
                <button type="submit" id="input-comment-button">Enviar</button>
            </>
            : null}
        </form>
    )
}