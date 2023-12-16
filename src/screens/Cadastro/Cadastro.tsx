import { useState, ChangeEvent, MouseEvent } from 'react';
import { useAuth } from '../../contexts/auth';
import logo from '../../assets/logo.svg';
import "./style.css"
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const nav = useNavigate();
  const context = useAuth();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setUserNameError("");
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  }

  const handleConfirmCadastro = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userName.trim()) {
      setUserNameError("Campo necessário");
      return;
    }

    if (!email.trim()) {
      setEmailError("Campo necessário");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Campo necessário");
      return;
    }

    if (!email.includes('@')) {
      setEmailError("Email inválido");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("A senha deve conter pelo menos 8 caracteres, incluindo maiúsculos, minúsculos e números");
      return;
    }

    context.signin(userName, email, password);
  }

  const redirect = () => {
    nav("/login")
  }

  return (
    <div className='cadastroDiv'>
      <div className='logoDiv'>
        <img src={logo} alt="logo" />
        <h1>Doarpp</h1>
      </div>

      <input type="text" id='inputNomeCadastro' value={userName} onChange={handleUserNameChange} placeholder='Nome de Usuário' />
      {userNameError && <span style={{ color: "red" }}>{userNameError}</span>}

      <input type="text" id='inputEmailCadastro' value={email} onChange={handleEmailChange} placeholder='Email' />
      {emailError && <span style={{ color: "red" }}>{emailError}</span>}

      <input type="password" id='inputSenhaCadastro' value={password} onChange={handlePasswordChange} placeholder='Senha' />
      {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

      <button id='buttonCadastro' onClick={handleConfirmCadastro}>Cadastrar</button>

      <a href="" id='linkLogin' onClick={redirect}>Já possui uma conta? <br />Clique aqui para entrar!</a>
    </div>
  );
}
