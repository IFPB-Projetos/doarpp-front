import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import lixeira from "../../assets/Delete.png";
import "./styles.css";

export default function FormPost() {
  const nav = useNavigate();
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const [imageSrc, setImageSrc] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [imageError, setImageError] = useState("");

  const dadoLocalUser = localStorage.getItem("user") || "";
  const user = JSON.parse(dadoLocalUser);

  const displayFileName = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.files && input.files.length > 0) {
      setFileName(input.files[0].name);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      setFileName("Nenhum arquivo selecionado");
      setImageSrc("");
    }
  };

  const handleCancel = () => {
    nav("/");
  };

  const handleEnviar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError("");
    setContentError("");
    setImageError("");

    if (!title.trim()) {
      setTitleError("Campo necessário");
    }

    if (!content.trim()) {
      setContentError("Campo necessário");
    }

    if (!imageSrc) {
      setImageError("Campo necessário");
    }

    if (!title.trim() || !content.trim() || !imageSrc) {
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);
      const response = await api.post("/posts", formData);
      nav("/postagens");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="telaForm">
      <div className="frasePrincipalTelaMain">
        <p>Criar postagem</p>
      </div>

      <div className="formCriarPost">
        <form
          action="http://localhost:8080/posts"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleEnviar}
        >
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <span style={{ color: "red" }}>{titleError}</span>}

          <div className="customFileUpload">
            <input
              type="file"
              id="imagem"
              name="imageUpload"
              accept="image/*"
              onChange={displayFileName}
            />
            <label htmlFor="imagem" className="fileNameLabel">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Imagem selecionada"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                fileName ? fileName : "Escolha um arquivo"
              )}
            </label>
            {imageError && <span style={{ color: "red" }}>{imageError}</span>}
          </div>

          <textarea
            name="content"
            cols={30}
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {contentError && <span style={{ color: "red" }}>{contentError}</span>}

          <div className="botoesForm">
            <button type="button" onClick={handleCancel}>
              <img src={lixeira} alt="Lixeira" />
              Cancelar
            </button>
            <button type="submit">Enviar</button>
          </div>
          <input type="hidden" value={user.id} name="userId" />
        </form>
      </div>
    </div>
  );
}
