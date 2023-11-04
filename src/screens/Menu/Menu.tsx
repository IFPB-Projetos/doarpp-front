import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import plusSign from '../../assets/plusSign.png';
import user from '../../assets/userpng.png'
import "./styles.css";

export default function Menu(){
    return (
        <>
            <nav id="menu">
                <ul>
                    <div>
                        <li className="menu-link">
                            <Link to={`/`} className="brand">
                                <img src={logo} alt="Logo do site"/>
                                <span>Doarpp</span>
                            </Link>
                        </li>
                        <li  className="menu-link">
                            <Link to={`postagens`}>Feed</Link>
                        </li>
                        <li className="menu-link">
                            <Link to={`mapa`}>Mapa</Link>
                        </li>
                    </div>

                    <div>
                        <li className="criar-post menu-link">
                            <Link to={`criarpost`}>
                                Criar Post
                                <img src={plusSign} alt="Sinal de mais"/>
                            </Link>
                        </li>
                        <li  className="menu-link profile">
                            <Link to={`perfil`}><img src={user} alt="Foto do usuário"/></Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    )
}