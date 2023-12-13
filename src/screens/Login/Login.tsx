import { useState, ChangeEvent, MouseEvent } from 'react';
import { useAuth } from '../../contexts/auth';
import logo from '../../assets/logo.svg';
import "./style.css"
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const context = useAuth();
  const nav = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  }

  const handleConfirmCadastro = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    try {
      await context.login(email, password);
      // Se o login for bem-sucedido, redirecionar para a página desejada
      nav("/postagens");
    } catch (error) {
      setError("Usuário não encontrado ou senha incorreta.");
    }
  }

  const redirect = () => {
    nav("/cadastro")
  }

  return (
    <div className='cadastroDiv'>
      <div className='logoDiv'>
        <img src={logo} alt="logo" />
        <h1>Doarpp</h1>
      </div>

      <input type="text" id='inputEmailCadastro' value={email} onChange={handleEmailChange} placeholder='Email' />

      <input type="password" id='inputSenhaCadastro' value={password} onChange={handlePasswordChange} placeholder='Senha' />
      {error && <span style={{ color: "red" }}>{error}</span>}

      <button id='buttonCadastro' onClick={handleConfirmCadastro}>Entrar</button>

      <a href="" id='linkLogin' onClick={redirect}>Não possui uma conta? <br />Clique aqui para registrar-se!</a>
    </div>
  );
}
