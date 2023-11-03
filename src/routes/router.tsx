import { createBrowserRouter } from "react-router-dom";
import Feed from "../screens/Feed/Feed";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <h1>AA</h1>,
                errorElement: <h1>Erro</h1>
            },
            {
                path: "feed",
                element: <Feed />,
                errorElement: <h1>Erro</h1>
            }
        ],
        
    },
])