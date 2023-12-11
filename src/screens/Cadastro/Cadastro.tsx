import { useState , ChangeEvent , MouseEvent } from 'react';
import { useAuth } from '../../contexts/auth';
import logo from '../../assets/logo.svg';
import "./style.css"
import { useNavigate } from 'react-router-dom';

export default function Cadastro(){
    const nav = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useAuth();

    const handleUserNameChange = (e : ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const handleEmailChange = (e : ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleConfirmCadastro = async (e : MouseEvent<HTMLButtonElement>)=>{
        context.signin(userName, email, password);
    }

    const redirect = () => {
        nav("/login")
    }

    return (
        <div className='cadastroDiv'>
            <div className='logoDiv'>
                <img src={logo} alt="logo"/>
                <h1>Doarpp</h1>
            </div>
            
            <input type="text" id='inputNomeCadastro' value={userName} onChange={handleUserNameChange} placeholder='Usuário'/>

            <input type="text" id='inputEmailCadastro' value={email} onChange={handleEmailChange} placeholder='Email'/>

            <input type="password" id='inputSenhaCadastro' value={password} onChange={handlePasswordChange} placeholder='Senha'/>
        
            <button id='buttonCadastro' onClick={handleConfirmCadastro}>Cadastrar</button>

            <a href="" id='linkLogin' onClick={redirect}>Já possui uma conta? <br />Clique aqui para entrar!</a>
        
        </div>
    );
}
