import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {api} from "../utils/api";

const AuthContext = createContext({} as AuthContext);

type AuthContext = {
    signed: boolean,
    user: object | null,
    signin(username:string, email:string, password:string): Promise<void>,
    login(email:string, password:string): Promise<void>,
    logout(): void,
}

type Props = {
    children: React.ReactNode
}

export function AuthProvider({children}:Props){
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if(savedUser && savedToken){
            setUser(JSON.parse(savedUser));
            api.defaults.headers.Authorization = `Bearer ${savedToken}`;
        }
    }, []);

    async function signin(username:string, email:string, password:string){
        const response = await api.post("/auth/signin", {
            username: username,
            email: email,
            password: password
        })

        login(email, password);
    }

    async function login(email:string, password:string){
        const response = await api.post("/auth/login", {email, password});

        setUser(response.data.user)
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
    }

    function logout(){
        setUser(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{signed: Boolean(user), user, signin, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}