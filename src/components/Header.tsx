"use client"

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Button } from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supaBaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogOut = async () => {
        const { error } = await supaBaseClient.auth.signOut();

        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged out successfully");
        }
    }

    return (
        <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden gap-x-2 items-center md:flex">
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.back()}>
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.forward()}>
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="flex gap-x-2 items-center md:hidden">
                    <button className="rounded-full p-2 bg-white flex items-center fustify-center hover:placeholder-opacity-75 transition">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center fustify-center hover:placeholder-opacity-75 transition">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center  gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                            onClick={handleLogOut}
                            className="bg-white px-6 py-2">
                                Logout
                            </Button>
                            <Button
                            onClick={() => router.push('/account')}
                            className="bg-white">
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button className="bg-transparent text-neutral-300 font-medium"
                                    onClick={authModal.onOpen}>
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button className="bg-white px-6 py-2"
                                    onClick={authModal.onOpen}>
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}