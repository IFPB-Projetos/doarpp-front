import { useState , ChangeEvent , MouseEvent } from 'react';
import { api } from "../../utils/api";
import { useAuth } from '../../contexts/auth';
import logo from '../../assets/logo.svg';
import "./style.css"

export default function Cadastro(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useAuth()

    const handleNameChange = (e : ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e : ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleConfirmCadastro = async (e : MouseEvent<HTMLButtonElement>)=>{
        // await axios.post("/");

    }

    return (
        <div className='cadastroDiv'>
            <div className='logoDiv'>
                <img src={logo} alt="logo"/>
                <h1>Doarpp</h1>
            </div>
            
            <input type="text" id='inputNomeCadastro' value={name} onChange={handleNameChange} placeholder='Usuário'/>

            <input type="text" id='inputEmailCadastro' value={email} onChange={handleEmailChange} placeholder='Email'/>

            <input type="password" id='inputSenhaCadastro' value={password} onChange={handlePasswordChange} placeholder='Senha'/>
        
            <button id='buttonCadastro' onClick={handleConfirmCadastro}>Cadastrar</button>

            <a href="#" id='linkLogin'>Já possui uma conta? <br />Clique aqui para entrar!</a>
        
        </div>
    );
}
