import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userEmail, setUserEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3001/lex/auth/check', { withCredentials: true });
                if (response.data?.authenticated) {
                    const storedEmail = localStorage.getItem('userEmail');
                    setUserEmail(storedEmail || response.data.email);
                    setIsAuthenticated(true);
                } else {
                    setUserEmail('');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setUserEmail('');
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const updateUserEmail = (email) => {
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3001/lex/auth/logout', {}, { withCredentials: true });
            setUserEmail('');
            setIsAuthenticated(false);
            localStorage.removeItem('userEmail');
        } catch (error) {
            console.error('Erro ao fazer logout', error);
        }
    };

    return (
        <UserContext.Provider value={{ userEmail, isAuthenticated, setIsAuthenticated, setUserEmail: updateUserEmail, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
