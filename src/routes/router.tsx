import { createBrowserRouter } from "react-router-dom";
import Feed from "../screens/Feed/Feed";
import Map from "../screens/Map/Map";
import Profile from "../screens/Profile/Profile";
import FormPost from "../screens/FormPost/FormPost";
import Main from "../screens/Main/Main";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main/>,
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
                element: <FormPost/>,
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