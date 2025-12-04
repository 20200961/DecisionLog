import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('이미 존재하는 이메일입니다.');
        }

        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            avatar: userData.name.charAt(0).toUpperCase(),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateProfile = (updateData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);


        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                ...updateData,
                avatar: updateData.name ? updateData.name.charAt(0).toUpperCase() : users[userIndex].avatar
            };
            localStorage.setItem('users', JSON.stringify(users));

            const updatedUser = { ...users[userIndex] };
            delete updatedUser.password;
            setCurrentUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    };

    const value = {
        currentUser,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};