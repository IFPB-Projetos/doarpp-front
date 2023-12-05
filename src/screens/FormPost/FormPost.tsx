import { useState, ChangeEvent } from "react";
import lixeira from "../../assets/Delete.png";
import "./styles.css";

export default function FormPost() {
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");

  const displayFileName = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.files && input.files.length > 0) {
      setFileName(input.files[0].name);
    } else {
      setFileName("Nenhum arquivo selecionado");
    }
  };

  const handleCancel = () => {
  };

  const handleEnviar = () => {
  };

  return (
    <div className="telaForm">
      <div className="frasePrincipalTelaMain">
        <p>Criar postagem</p>
      </div>

      <div className="formCriarPost">
        <form action="/" method="post">
          <input type="text" name="titulo" placeholder="Título" />

          <div className="customFileUpload">
            <input
              type="file"
              id="imagem"
              name="imagem"
              accept="image/*"
              onChange={displayFileName}
            />
            <label
              htmlFor="imagem"
              className="fileNameLabel"
            >
              {fileName ? fileName : "Escolha um arquivo"}
            </label>
          </div>
          <textarea name="comentario" cols={30} rows={20}></textarea>

          <div className="botoesForm">
            <button type="button" onClick={handleCancel}>
                <img src={lixeira} />Cancelar
            </button>
            <button type="button" onClick={handleEnviar}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
