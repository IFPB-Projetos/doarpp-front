import { useParams } from "react-router-dom";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { api } from "../../utils/api";
import phoneImg from "../../assets/phone.png";
import mailImg from "../../assets/mail.png";
import "./styles.css";
import { Post } from "../../utils/types/Post";
import { useAuth } from "../../contexts/auth";
import InputPosition from "../../components/InputPosition/InputPosition";
import { User } from "../../utils/types/User";
import CustomScrollMenu from "../../components/CustomScrollMenu/CustomScrollMenu";
import InputMask from "react-input-mask";
import editarIcone from "../../assets/Edit.png";
import leaveIcon from "../../assets/Logout.png"

type Position = {
  lat: number,
  lng: number
}

export default function Profile() {
  const [profile, setProfile] = useState<User>({
    name: "",
    username: "",
    image: "",
    id: "",
    email: "",
    password: "",
    description: "",
    phone: "",
    location: null,
    posts: null
  });
  const [position, setPosition] = useState<Position>({lat: -6.88634, lng: -38.5614})
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState("Nenhuma foto");
  const [imageSrc, setImageSrc] = useState("");
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);


  let { userName } = useParams();
  const context = useAuth();

  const pathImage = import.meta.env.VITE_API_URL + "/imgs/";

  async function getUser() {
    const response = await api.get(`/users/${userName}`);

    if(response.data.image){
        setImageSrc(response.data.image);
    }

    setProfile(response.data)
  }

async function pegarFavs(id: string) {
  try {
    const favoritesResponse = await api.get(`/favorite/user/${id}`);

    const favoriteIds = favoritesResponse.data.map(favorite=> favorite.postId);

    const detailedPosts = [];

    for (const postId of favoriteIds) {
      const postDetailsResponse = await api.get(`/posts/${postId}`);
      const postDetails = postDetailsResponse.data;
      detailedPosts.push(postDetails);
    }

    setFavoritePosts(detailedPosts);
  } catch (error) {
    console.error(error);
  }
}

  const handleEditingChange = () => {
    setIsEditing(!isEditing);
  }

  const handleLogout = () => {
    context.logout();
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfile({...profile, name: event.currentTarget.value});
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({...profile, description: event.currentTarget.value});
  }
  

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setProfile({ ...profile, phone: event.currentTarget.value });
  };

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
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget)

      formData.append("lat", `${position.lat}`);
      formData.append("lng", `${position.lng}`)

      await api.patch("/users/me", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setIsEditing(!isEditing);
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getUser();
    pegarFavs(profile.id);
  }, [userName, profile.id])

  return (
    <>
      <div className="profile-body">
        {profile ? (
        <>
          <form className="profile-info" onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
            <input type="hidden" name="userId" value={profile.id} />

            <div className="customFileUpload">
              <input
                type="file"
                id="profile-image-input"
                name="imageUpload"
                accept="image/*"
                onChange={(e) => {
                  displayFileName(e);
                }}
                disabled={!isEditing}
              />
              <label htmlFor="profile-image-input" id="profile-image-label"  aria-disabled={!isEditing}>
                {imageSrc ? (
                  imageSrc.startsWith("data") ? (
                    <img
                      src={imageSrc}
                      alt="Imagem selecionada"
                      id="profile-image"
                    />
                  ) : (
                    <img
                      src={pathImage + imageSrc}
                      alt="Imagem back"
                      id="profile-image"
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

            <div>
              <input
                placeholder="Nome"
                readOnly={!isEditing}
                id="personName"
                name="name"
                value={profile.name}
                onChange={handleNameChange}
              />

              <input
                placeholder="Nome de usuário"
                readOnly
                id="username"
                name="username"
                value={profile.username}
              />
            </div>

            <textarea
              readOnly={!isEditing}
              value={profile.description}
              name="description"
              onChange={handleDescriptionChange}
            />

            <div className="profile-contact-info">
              <span>Contatos</span>
              <div>
                <label><img src={phoneImg} alt="Icone de telefone" /></label>
                    
                  <InputMask
                    readOnly={!isEditing}
                    mask="+99 (99) 99999-9999"
                    maskChar="_"
                    name="phone"
                    value={profile.phone}
                    onChange={handlePhoneChange}
                  />
              </div>
              <div>
                <label><img src={mailImg} alt="Icone de email" /></label>
                <input
                  readOnly
                  name="email"
                  value={profile.email}
                />
              </div>
            </div>

            {profile.id === context.user?.id && isEditing && (
                <InputPosition position={position} setPosition={setPosition}/>
            )}

            {profile.id === context.user?.id && !isEditing && (
              <button onClick={handleLogout} className="btn_formUserFeed"><img src={leaveIcon} alt="sair" />Sair</button>
            )}
            {profile.id === context.user?.id && !isEditing && (
              <button onClick={handleEditingChange} className="btn_formUserFeed"><img src={editarIcone} alt="editar" />Editar</button>
            )}
            {profile.id === context.user?.id && isEditing && (
              <>
                <button onClick={handleEditingChange} className="btn_formUserFeed voltarButton">Voltar</button>
                <button type="submit" className="btn_formUserFeed">Salvar</button>
              </>
            )}
          </form>

          <div className="profile-cards">

            <div className="profile-posts">
              <h2>Postagens</h2>
              { profile.posts?.length !== 0
                ?
                <CustomScrollMenu posts={profile.posts}/> 
                :
                <span className="profile-posts-warning">O usuário ainda não fez nenhum post!</span>
              }
            </div>

            <div className="profile-posts">
              <h2>Favoritados</h2>
              { favoritePosts.length !== 0
                ?
                <CustomScrollMenu posts={favoritePosts}/> 
                :
                <span className="profile-posts-warning">O usuário ainda não favoritou nenhum post!</span>
              }
            </div>
          </div>
        </>
        ) : (
          <span>Desculpe, o usuário não existe!</span>
        )}
      </div>
    </>
  )
}
