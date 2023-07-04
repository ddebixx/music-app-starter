"use client"

import React from "react";
import { Song } from "../../types"
import { useLoadImage } from "@/hooks/useLoadImage";
import Image from "next/image";
import { usePlayer } from "@/hooks/usePlayer";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

export const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const imageURL = useLoadImage(data);
    const player = usePlayer();

    const handleClick = () => {
        if (onClick) {
            onClick(data.id);
        }

        player.setID(data.id);

        return player.setID(data.id)
    }

    return (
        <div onClick={handleClick}
        className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image className="object-cover"
                src={imageURL || '/images/liked.png'}
                alt="image"
                fill />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </div>
    )
}