import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(
        null
    )
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null)

    const login = (userData, accessToken, refreshToken = null) =>{
        setUser(userData);
        setToken(accessToken);

        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        if(refreshToken){
            localStorage.setItem('refreshToken', refreshToken);
        }
    };

    const logout = () => {
        setUser(null)
        setToken(null)
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
    }

    useEffect(() => {
        if (token && user) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
        } 
    }, [token, user]);

    return (
        <AuthContext.Provider value={{user, token, login, logout, isAuthenticated : !!token, role: user?.role || null}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}