import { useParams } from "react-router-dom";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { api } from "../../utils/api";
import Card from "../../components/Card/Card";
import phoneImg from "../../assets/phone.png";
import mailImg from "../../assets/mail.png";
import "./styles.css";
import { Post } from "../../utils/types/Post";

export default function Profile(){
    const [posts, setPosts] = useState<Post[]>();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
    const [imageSrc, setImageSrc] = useState("");

    let {userName} = useParams();
    const pathImage = import.meta.env.VITE_API_URL + "/imgs/";

    async function getUser(){
        const response = await api.get(`/users/${userName}`);

        if(response.data.id){
            setId(response.data.id);
        }
        if(response.data.image){
            setImageSrc(response.data.image);
        }
        if(response.data.username){
            setName(response.data.username);
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

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value);
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.currentTarget.value)
    }

    const displayFileName = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
    
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          setFileName(file.name);
      
          const reader = new FileReader();
          reader.onload = () => {
            setImageSrc(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setFileName("Nenhum arquivo selecionado");
          setImageSrc("");
        }
      };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            const formData = new FormData(event.currentTarget)

            await api.patch("/users/me", formData, {headers: {'Content-Type': 'multipart-form-data'}});
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="profile-body">
                <form className="profile-info" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="userId" value={id}/>

                    <div className="customFileUpload">
                        <input
                        type="file"
                        id="imagem"
                        name="imageUpload"
                        accept="image/*"
                        onChange={(e) => {
                            displayFileName(e);
                        }}
                        readOnly={!isEditing}
                        />
                        <label htmlFor="imagem" className="profile-image-label">
                            {imageSrc ? (
                            imageSrc.startsWith("data") ? (
                            <img
                            src={imageSrc} 
                            alt="Imagem selecionada"
                            style={{ width: "100%", height: "100%", borderRadius: "100%", objectFit: "contain" }}
                            />
                            ) : (
                            <img
                                src={ pathImage + imageSrc} 
                                alt="Imagem back"
                                className="profile-image"
                            />
                            )
                            )
                            :
                            (
                                <span>
                                {fileName ? fileName : "Escolha um arquivo"}
                                </span>
                            )}
                        </label>
                    </div>

                    <input 
                        placeholder="Nome"
                        readOnly={!isEditing}
                        id="personName"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    
                    <textarea 
                        readOnly={!isEditing}
                        value={description}
                        name="description"
                        onChange={handleDescriptionChange}
                    />

                    <div className="profile-contact-info">
                        <span>Contatos</span>
                        <div>
                            <label><img src={phoneImg} alt="Icone de telefone" /></label>
                            <input
                                readOnly={!isEditing}
                                name="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <div>
                            <label><img src={mailImg} alt="Icone de email"/></label>
                            <input
                                readOnly={!isEditing}
                                name="email"
                                value={email}
                            />
                        </div>
                    </div>

                    {!isEditing && (
                        <button onClick={handleEditingChange}>editar</button>
                    )}
                    {isEditing && (
                        <>
                        <button onClick={handleEditingChange}>voltar</button>
                        <button type="submit">salvar</button>
                        </>
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