import { useNavigate } from "react-router-dom";

import "./styles.css"

export default function Main(){

    const nav = useNavigate();

    const handleCadastro = () =>{

        nav("/cadastro");

    }

    return(
        <div className="telaMain">
            <div className="conteudoMain">
                <h1>Doarpp</h1>
                <div className="boxTexto">
                    <p>Bem-vindo ao Doarpp, o site que conecta você com as causas que mais importam</p>
                </div>
                <button onClick={handleCadastro}>Ajude agora mesmo!</button>
            </div>
        </div>
    )
}