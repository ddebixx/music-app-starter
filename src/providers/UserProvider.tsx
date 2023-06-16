"use client";

import { UserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ 
    children 
}) => {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}
