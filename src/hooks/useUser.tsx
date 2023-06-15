import { User } from "@supabase/auth-helpers-nextjs";
import { SubscriptionDetails, UserDetails } from "../../types";
import { createContext } from "react";
import { useSessionContext, 
    useUser as useSupaUser 
} from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscriptions: SubscriptionDetails | null;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined,
);

export interface Props {
    [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase,
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadinData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscrition = () => supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .single();

    useEffect(() => {
        if (user && !isLoadinData && !userDetails && !subscription) {
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(), getSubscrition()]).then(
                (results) => {
                    const userDeatailsPropmise = results[0];
                    const subscriptionPromise = results[1];

                    if (userDeatailsPropmise.status === 'fulfilled') {
                        setUserDetails(userDeatailsPropmise.value.data as UserDetails);
                    }

                    if (subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as SubscriptionDetails);
                    }

                    setIsLoadingData(false);
                }
            );
        } else if (!user && (isLoadingUser || !isLoadinData)) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]); 
    
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadinData,
        subscriptions: subscription,
    };

    return <UserContext.Provider value={value} {...props} />
}


export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider');
    }

    return context;
}
