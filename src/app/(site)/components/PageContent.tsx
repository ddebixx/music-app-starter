"use client"

import { useOnPlay } from "../../../hooks/useOnPlay";
import { Song } from "../../../../types";
import { SongItem } from "../../../components/SongItem";

interface PageContentProps {
    songs: Song[];
}

export const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-white text-2xl font-semibold">
                    No songs found
                </h1>
                <p className="text-white text-sm text-opacity-70">
                    Try uploading one
                </p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
            {songs.map((song) => (
                <SongItem
                    key={song.id}
                    onClick={(id: string) => onPlay(id)}
                    data={song}
                />
            ))}
        </div>
    )
}