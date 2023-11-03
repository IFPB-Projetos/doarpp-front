import { createBrowserRouter, Outlet } from "react-router-dom";
import Menu from "../screens/Menu/Menu";
import Feed from "../screens/Feed/Feed";

function AppLayout(){
    return (
        <>
            <Menu />
            <Outlet />
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "app",
                element: <h1>Erro</h1>
            },
            {
                path: "feed",
                element: <Feed />
            }
        ],
        errorElement: <h1>Erro</h1>
    },
])