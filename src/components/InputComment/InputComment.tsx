import { FormEvent, useState } from "react";
import { api } from "../../utils/api";
import "./style.css";

type Props = {
    postId: string
}

export default function InputComment({postId}:Props){
    const [content, setContent] = useState("");

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
            <input type="hidden" value={postId} name="postId" />
            <textarea
                placeholder="Comentário"
                name="content"
                id="input-comment-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}/>
            <button type="submit" id="input-comment-button">Enviar</button>
        </form>
    )
}