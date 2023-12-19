import { FormEvent, useState } from "react";
import { api } from "../../utils/api";
import "./style.css";
import { useAuth } from "../../contexts/auth";

type Props = {
  postId: string;
};

export default function InputComment({ postId }: Props) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { signed } = useAuth();

  async function handleCreateComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setError("O comentário não pode ser vazio");
      return;
    }

    try {
      await api.post("/comments/", { content, postId });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      id="input-comment-body"
      onSubmit={handleCreateComment}
      method="POST"
    >
      {signed ? (
        <>
          <input type="hidden" value={postId} name="postId" />
          <textarea
            placeholder="Comentário"
            name="content"
            id="input-comment-content"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setError(null);
            }}
          />
          {error && <span className="comment-error">{error}</span>}
          <button type="submit" id="input-comment-button">
            Enviar
          </button>
        </>
      ) : null}
    </form>
  );
}
