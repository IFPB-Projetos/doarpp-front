import Card from "../../components/Card/Card";
import "./styles.css";

export default function Feed() {
    return (
        <>
            <div id="feed-body">
                <h2>Filtrar!</h2>
                <form className="filter">
                    <div>
                        <label>Localidade:</label>
                        <input placeholder="localidade"></input>
                    </div>

                    <div>
                        <label>Categorias:</label>
                        <input placeholder="localização" />
                    </div>
                </form>

                <h2>Ajude!</h2>
                <div className="posts-div">
                    <Card />
                </div>
            </div>
        </>
    )
}
