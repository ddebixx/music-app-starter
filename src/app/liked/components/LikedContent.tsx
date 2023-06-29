"use client"

import React, { useEffect } from "react";
import { Song } from "../../../../types";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { MediaItem } from "@/components/MediaItem";
import { LikeButton } from "@/components/LikeButton";

interface LikedContentProps {
    songs: Song[];
}

export const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading, user} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, router, user])

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                    No songs found
            </div>
        )
    }

    return (
        <div>
            {songs.map((song) => (
                <div key={song.id}
                className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem onClick={() => {}} 
                        data={song}/>
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    )
}