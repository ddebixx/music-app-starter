import { Song } from "../../types";
import { useAuthModal } from "./useAuthModal";
import { usePlayer } from "./usePlayer";
import { useUser } from "./useUser";

export const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        player.setIDs(songs.map((song) => song.id));
        player.setID(id);
    }

    return onPlay;
}