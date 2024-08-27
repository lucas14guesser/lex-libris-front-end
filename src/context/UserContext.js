import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const updateUserEmail = (email) => {
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
    };

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail: updateUserEmail }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
