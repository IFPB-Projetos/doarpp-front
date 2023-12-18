import { Link } from "react-router-dom";
import user from "../../assets/userpng.png";
import "./style.css";

export default function Comment(){
    return (
        <div className="comment-body">
            <Link to={`/perfil/robson`} className="comment-profile-picture">
                <img src={user} alt="Foto do usuário"/>
            </Link>
            <div className="comment-text">
                <span className="comment-author">Robson</span>
                <p className="comment-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum unde laborum necessitatibus quae ad amet alias? Soluta nulla commodi debitis corporis aut sequi dolores, unde laboriosam tenetur. Dolorem, reiciendis nemo.

                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis beatae dicta atque, maxime ab corporis omnis est nostrum aspernatur, obcaecati molestiae voluptatem laboriosam numquam quisquam earum hic quod repudiandae corrupti!
                </p>
            </div>

        </div>
    )
}