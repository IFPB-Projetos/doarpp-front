import Card from "../../components/Card/Card";
import phone from "../../assets/phone.png";
import mail from "../../assets/mail.png";
import "./styles.css";

export default function Map(){
    return (
        <>
            <div className="profile-body">
                <form className="profile-info">
                    <img src="https://0.gravatar.com/avatar/98b7bf232235300b9472ca44d4306596d246e0b0c025033bfcaa6b2ed12536ec?size=128" alt="Perfil"/>

                    <input placeholder="Nome" readOnly id="personName"/>
                    <textarea 
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit justo ac dui facilisis pretium. Nulla facilisi. Sed semper tellus eget lorem hendrerit imperdiet. Nunc blandit magna eget mauris hendrerit, non sagittis erat sodales. Aenean sollicitudin vitae diam ut vestibulum."
                        readOnly
                    />

                    <div className="profile-contact-info">
                        <span>Contatos</span>
                        <div>
                            <label><img src={phone} alt="Icone de telefone" /></label>
                            <input placeholder="88 9 9666-6666" readOnly />
                        </div>
                        <div>
                            <label><img src={mail} alt="Icone de email"/></label>
                            <input placeholder="exemplo@mail.com" readOnly />
                        </div>
                    </div>
                </form>

                <div className="profile-fav">
                    <h2>Postagens</h2>
                    <div className="profile-fav-grid">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </>
    )
}