"use client";

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer } from "react";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}
interface AuthState {
    isLoggedIn: boolean;
    user: AuthUser | null;
}

type AuthAction =
    | { type: 'LOGIN'; payload: AuthUser }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: AuthUser };

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    logout: () => Promise<void>;
} | undefined>(undefined);


const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { isLoggedIn: true, user: action.payload };
        case 'LOGOUT':
            return { isLoggedIn: false, user: null };
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch('/api/auth/verify', {
                    method: 'GET',
                    credentials: 'include', // This is important for including cookies
                });
                if (response.ok) {
                    const userData = await response.json();
                    dispatch({ type: 'LOGIN', payload: userData });
                }
            } catch (error) {
                console.error('Error verifying authentication:', error);
            }
        };
        verifyAuth();
    }, []);

    const logout = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                dispatch({ type: 'LOGOUT' });
                router.push('/login'); // Redirect to home page after logout
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }, [router]);

    return (
        <AuthContext.Provider value={{ state, dispatch, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};