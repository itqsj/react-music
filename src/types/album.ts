import { ArtistAlbumsInt } from '@/types/artist';
import { TracksInt } from '@/types/playList';

export interface ResAlbumDetailInt {
    album: ArtistAlbumsInt;
    code: number;
    resourceState: boolean;
    songs: TracksInt[];
}

export interface ResAlbumDynamicInt {
    albumGameInfo: number;
    code: number;
    commentCount: number;
    isSub: boolean;
    likedCount: number;
    onSale: boolean;
    shareCount: number;
    subCount: number;
    subTime: number;
}
