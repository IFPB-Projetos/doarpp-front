import missingImage from "../../assets/image-missing.png";
import Card from "../../components/Card/Card";
import "./styles.css";

export default function Feed(){
    return (
        <>
            <div id="feed-body">
                <h1>Filtrar!</h1>
                <form className="filter">
                    <div>
                        <label>Localidade:</label>
                        <input value="localidade"></input>
                    </div>

                    <div>
                        <label>Categorias:</label>
                        <input />
                    </div>
                </form>

                <h1>Ajude!</h1>
                <div className="posts-div">
                    <Card />
                </div>
            </div>
        </>
    )
}