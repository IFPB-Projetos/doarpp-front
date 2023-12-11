import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../utils/api";
import { User } from "../utils/types/User";

const AuthContext = createContext({} as AuthContext);

type AuthContext = {
    signed: boolean,
    user: User | null,
    signin(username:string, email:string, password:string): Promise<void>,
    login(email:string, password:string): Promise<void>,
    logout(): void,
}

type Props = {
    children: React.ReactNode
}

export function AuthProvider({children}:Props){
    const [user, setUser] = useState<User | null>(null);
    const nav = useNavigate();

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

        nav("/login")
    }

    async function login(email:string, password:string){
        const response = await api.post("/auth/login", {email, password});

        setUser(response.data.user)
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        nav("/postagens")
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