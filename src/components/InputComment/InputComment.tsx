import "./style.css";

type Props = {
    userId: string,
    postId: string
}

export default function InputComment({userId, postId}:Props){
    return (
        <form id="input-comment-body">
            <input type="hidden" value={userId} name="userId" />
            <input type="hidden" value={postId} name="postId" />
            <textarea placeholder="Comentário" name="content" id="input-comment-content"/>
            <button type="submit" id="input-comment-button">Enviar</button>
        </form>
    )
}