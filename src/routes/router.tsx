import { createBrowserRouter } from "react-router-dom";
import Feed from "../screens/Feed/Feed";
import Map from "../screens/Map/Map";
import Profile from "../screens/Profile/Profile";
import FormPost from "../screens/FormPost/FormPost";
import Cadastro from "../screens/Cadastro/Cadastro";
import Main from "../screens/Main/Main";
import EditaForm from "../screens/EditaForm/EditaForm";
import App from "../App";
import Login from "../screens/Login/Login";
import PostDetail from "../screens/PostDetail/PostDetail";
import EditComment from "../screens/EditComment/EditComment";

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
                path: "/perfil/:userName",
                element: <Profile />,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "/detalhes/:postId",
                element: <PostDetail />,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "cadastro",
                element: <Cadastro/>,
                errorElement: <h1>Error</h1>
            },
            {
                path: "login",
                element: <Login/>,
                errorElement: <h1>Error</h1>
            },
            {
                path: "editarpost/:id",
                element: <EditaForm/>,
                errorElement: <h1>Error</h1>
            },
            {
                path: "/editarcomment/:id",
                element: <EditComment />,
                errorElement: <h1>Error</h1>
            }
        ],
        
    },
])