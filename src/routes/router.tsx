import { createBrowserRouter } from "react-router-dom";
import Feed from "../screens/Feed/Feed";
import Map from "../screens/Map/Map";
import Profile from "../screens/Profile/Profile";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <h1>Página principal</h1>,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "postagens",
                element: <Feed />,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "mapa",
                element: <Map />,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "criarpost",
                element: <h1>Criar Postagem</h1>,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "perfil",
                element: <Profile />,
                errorElement: <h1>Erro</h1>
            },
        ],
        
    },
])