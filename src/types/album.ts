import { ArtistAlbumsInt } from '@/types/artist';
import { TracksInt } from '@/types/playList';

export interface ResAlbumDetailInt {
    album: ArtistAlbumsInt;
    code: number;
    resourceState: boolean;
    songs: TracksInt[];
}
