import { ArtistAlbumsInt, ArtistList } from '@/types/artist';

//最新音乐返回值
export interface ResNewSongsInt {
    code: number;
    data: NewSongsInt[];
}
//最新音乐
export interface NewSongsInt {
    //歌单信息
    id: string;
    name: string;
    artists: ArtistList[];
    album: ArtistAlbumsInt;
    mvid: number;
    duration: number;
}

export interface ParamsInt {
    type?: number;
}
