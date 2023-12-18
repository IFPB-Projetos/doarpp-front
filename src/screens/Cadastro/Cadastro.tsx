import { useForm } from 'react-hook-form';
import { useState} from 'react';
import { useAuth } from '../../contexts/auth';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

import "./style.css";

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState(""); // Novo estado para o erro da API

  const context = useAuth();
  const nav = useNavigate();

  const handleConfirmCadastro = async (data) => {
    setApiError(""); 

    try {
      const response = await context.signin(data.userName, data.email, data.password);

      nav('/login');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === 'user already exists') {
        setApiError('Usuário já existe. Escolha um nome de usuário diferente.');
      } else {
        console.error('Erro ao cadastrar usuário:', error);
        setApiError('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      }
    }
  };

  const redirect = () => {
    nav('/login');
  };

  return (
    <div className='cadastroDiv'>
      <div className='logoDiv'>
        <img src={logo} alt="logo" />
        <h1>Doarpp</h1>
      </div>

      <form onSubmit={handleSubmit(handleConfirmCadastro)}>
        <input
          type="text"
          id='inputNomeCadastro'
          placeholder='Nome de Usuário'
          {...register('userName', { required: 'Necessario o nome do usuário' })}
        />
        {errors.userName && <span style={{ color: "red" }}>{errors.userName.message || userNameError}</span>}

        <input
          type="text"
          id='inputEmailCadastro'
          placeholder='Email'
          {...register('email', { required: 'Email necessario', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' } })}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message || emailError}</span>}

        <input
          type="password"
          id='inputSenhaCadastro'
          placeholder='Senha'
          {...register('password', {
            required: 'Senha não pode ser vazio',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: 'A senha deve conter pelo menos 8 caracteres, incluindo maiúsculos, minúsculos e números',
            },
          })}
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message || passwordError}</span>}

        {/* Exibir mensagem de erro da API */}
        {apiError && <span style={{ color: "red" }}>{apiError}</span>}

        <button id='buttonCadastro' type="submit">Cadastrar</button>
      </form>

      <a href="" id='linkLogin' onClick={redirect}>
        Já possui uma conta? <br />Clique aqui para entrar!
      </a>
    </div>
  );
}
