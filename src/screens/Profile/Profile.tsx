import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { User } from "../../utils/types/User";
import Card from "../../components/Card/Card";
import phoneImg from "../../assets/phone.png";
import mailImg from "../../assets/mail.png";
import "./styles.css";
import { Post } from "../../utils/types/Post";

type Props = {
    me?: User
}

export default function Profile(){
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    let {userName} = useParams();

    async function getUser(){
        const response = await api.get(`/users/${userName}`);

        if(response.data.username){
            setName(response.data.username);
        }
        if(response.data.image){
            //setImage(response.data.image);
        }
        if(response.data.description){
            setDescription(response.data.description);
        }
        if(response.data.phone){
            setPhone(response.data.phone);
        }
        if(response.data.email){
            setEmail(response.data.email);
        }
        if(response.data.posts){
            setPosts(response.data.posts)
        }
    }

    const handleEditingChange = () => {
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            <div className="profile-body">
                <form className="profile-info">
                    <img src="https://0.gravatar.com/avatar/98b7bf232235300b9472ca44d4306596d246e0b0c025033bfcaa6b2ed12536ec?size=128" alt="Perfil"/>

                    <input 
                        placeholder="Nome"
                        readOnly={!isEditing}
                        id="personName"
                        value={name}
                    />
                    
                    <textarea 
                        readOnly={!isEditing}
                        value={description}
                    />

                    <div className="profile-contact-info">
                        <span>Contatos</span>
                        <div>
                            <label><img src={phoneImg} alt="Icone de telefone" /></label>
                            <input
                                readOnly={!isEditing}
                                value={phone}
                            />
                        </div>
                        <div>
                            <label><img src={mailImg} alt="Icone de email"/></label>
                            <input
                                readOnly={!isEditing}
                                value={email}
                            />
                        </div>
                    </div>

                    {!isEditing && (
                        <button onClick={handleEditingChange}>editar</button>
                    )}
                    {isEditing && (
                        <button onClick={handleEditingChange}>voltar</button>
                    )}
                </form>

                <div className="profile-fav">
                    <h2>Postagens</h2>
                    <div className="profile-fav-grid">
                        {posts?.map((post) => (
                            <Card post={post} key={post.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}