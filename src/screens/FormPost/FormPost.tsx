import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import lixeira from "../../assets/Delete.png";
import "./styles.css";

export default function FormPost() {
  const nav = useNavigate();
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const [imageSrc, setImageSrc] = useState("");
  
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

    try {
      const formData = new FormData(event.currentTarget);

      const response = await api.post("/posts", formData);

      nav("/postagens");

    } catch (error) {
      
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
          <input type="text" name="title" placeholder="Título" />

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
                <img src={imageSrc} alt="Imagem selecionada" style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit:"cover" }} />
              ) : (
                fileName ? fileName : "Escolha um arquivo"
              )}
            </label>
          </div>
          <textarea name="content" cols={30} rows={20}></textarea>

          <div className="botoesForm">
            <button type="button" onClick={handleCancel}>
              <img src={lixeira} alt="Lixeira" />
              Cancelar
            </button>
            <button type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
