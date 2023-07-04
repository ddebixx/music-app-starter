"use client";

import { AuthModal } from "@/components/AuthModal";
import { SubscribeModal } from "@/components/SubscribeModal";
import { UploadModal } from "@/components/UploadModal";
import { useEffect, useState } from "react";
import { ProductWithPrice } from "../../types";

interface ModalProviderProps {
    products: ProductWithPrice[];
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
    products,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
        </div>
    )
}