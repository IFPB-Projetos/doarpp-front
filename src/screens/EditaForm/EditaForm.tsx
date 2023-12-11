import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../utils/api";
import lixeira from "../../assets/Delete.png";
import "./style.css";

export default function EditaForm() {
  const nav = useNavigate();
  const location = useLocation();

  const postId = location.state?.id;
  const pathImage = import.meta.env.VITE_API_URL + "imgs/";

  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const [imageSrc, setImageSrc] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageSrc: "",
    userId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        const postDataFromApi = response.data;

        setPostData({
          title: postDataFromApi.title,
          content: postDataFromApi.content,
          imageSrc: postDataFromApi.image,
          userId : postDataFromApi.user.id,
        });

        setImageSrc(postDataFromApi.image);

        console.log(postDataFromApi);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  const displayFileName = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setFileName(file.name);
  
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    
      const response = await api.patch(`/posts/${postId}`, formData);
  
      nav("/postagens");
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, title: event.target.value });
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({ ...postData, content: event.target.value });
  };

  return (
    <div className="telaForm">
      <div className="frasePrincipalTelaMain">
        <p>Editar postagem</p>
      </div>

      <div className="formCriarPost">
        <form
          action={`http://localhost:8080/posts/${postId}`}
          method="patch"
          encType="multipart/form-data"
          onSubmit={handleEnviar}
        >
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={postData.title}
            onChange={handleTitleChange}
          />

          <div className="customFileUpload">
            <input
              type="file"
              id="imagem"
              name="imageUpload"
              accept="image/*"
              onChange={(e) => {
                displayFileName(e);
              }}
            />
        <label htmlFor="imagem" className="fileNameLabel">
  {imageSrc ? (
    imageSrc.startsWith("data") ? (
      <img
        src={imageSrc} 
        alt="Imagem selecionada"
        style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }}
      />
    ) : (
      <img
        src={ pathImage + imageSrc} 
        alt="Imagem back"
        style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }}
      />
    )
  ) : (
    <span>
      {fileName ? fileName : "Escolha um arquivo"}
    </span>
  )}
</label>

          </div>
          <textarea
            name="content"
            cols={30}
            rows={20}
            value={postData.content}
            onChange={handleContentChange}
          ></textarea>

          <div className="botoesForm">
            <button type="button" onClick={handleCancel}>
              <img src={lixeira} alt="Lixeira" />
              Cancelar
            </button>
            <button type="submit">Enviar</button>
          </div>

          <input type="hidden"  value={postData.userId} name="userId"/>
        </form>
      </div>
    </div>
  );
}
