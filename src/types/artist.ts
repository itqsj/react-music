export interface TypeInt {
    name: string;
    value: string | number;
}

export interface DataInt {
    type: string;
    lists: TypeInt[];
}

//歌手列表请求参数
export interface ParamsInt {
    limit?: number;
    offset?: number;
    type?: number;
    area?: number;
    initial?: string;
}

//歌手列表返回值
export interface ResArtistList {
    artists: ArtistList[];
    code: number;
    more: boolean;
}

export interface ArtistList {
    albumSize: number;
    alias: string[];
    briefDesc: string;
    followed: false;
    id: number;
    img1v1Id: number;
    img1v1Id_str: string;
    img1v1Url: string;
    musicSize: number;
    name: string;
    picId: number;
    picId_str: string;
    picUrl: string;
    topicPerson: number;
    trans: string;
}
