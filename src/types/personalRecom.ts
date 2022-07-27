export interface PersonalInt {
    alg?: string;
    canDislike?: boolean;
    copywriter?: string;
    highQuality?: boolean;
    id?: number;
    name?: string;
    picUrl?: string;
    playCount?: number;
    trackCount?: number;
    trackNumberUpdateTime?: number;
    type?: number;
}

export interface ParamsIdInt {
    id: string | null;
}

export interface PlayListDetailInt {
    code?: number;
    playlist?: PlayListInt;
    privileges?: Array<object>;
    relatedVideos?: string | null;
    resEntrance?: string | null;
    sharedPrivilege?: string | null;
    urls?: string | null;
}

export interface PlayListInt {
    //歌单信息
    id: string;
    name: string;
    creator: CreatorInt;
    tracks: TracksInt[]; //歌曲
    coverImgUrl: string;
    createTime: number;
    tags: Array<string>; //标签
    trackCount: number; //歌曲数
    playCount: number; //播放数量
    description: string; //描述
    subscribedCount: number; //收藏数量
    shareCount: number; //分享数量
}
export interface CreatorInt {
    nickname: string;
    avatarUrl: string;
}

export interface TracksInt {
    // 歌曲信息
    id: string; //id
    name: string; //歌曲名
    ar: ArInt[]; //歌手
    al: AlInt; //专辑
    dt: number; //时长
}

export interface AlInt {
    // 专辑信息
    id: string; //id
    name: string; //专辑名
    pic: number;
    picUrl: string;
    pic_str: string;
}

export interface ArInt {
    // 歌手信息
    id: string; //id
    name: string; //歌手名
}

export interface SongInt {
    //歌曲url
    id: string;
    url: string;
}
