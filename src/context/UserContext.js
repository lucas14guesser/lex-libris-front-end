import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userEmail, setUserEmail] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedToken = sessionStorage.getItem('token');
        
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const updateUserEmail = (email) => {
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
    };

    const updateToken = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('token', newToken);
    };

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail: updateUserEmail, token, setToken: updateToken }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
