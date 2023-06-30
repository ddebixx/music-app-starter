"use client"

import { useGetSongsById } from "@/hooks/useGetSongsById";
import { useLoadSongURL } from "@/hooks/useLoadSongURL";
import { usePlayer } from "@/hooks/usePlayer"
import { PlayerContent } from "./PlayerContent";

export const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongsById(player.activeID);

    const songURL = useLoadSongURL(song!)

    if (!song || !songURL || !player.activeID) {
        return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
            <PlayerContent 
            song={song}
            songURL={songURL}
            key={songURL}/>
        </div>
    )
}