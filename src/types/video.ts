import { ArtistList } from '@/types/artist';

//mv推荐的返回值
export interface PersonalRecomVideoInt {
    code: number;
    category: number;
    result: Array<RecomVideoInt>;
}

//单个推荐数据
export interface RecomVideoInt {
    alg: string;
    artistId: number;
    artistName: string;
    artists: Array<ArtistsInt>;
    canDislike: boolean;
    copywriter: string;
    duration: number;
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
    subed: boolean;
    trackNumberUpdateTime: number;
    type: number;
}

//
export interface ArtistsInt {
    id: number;
    name: string;
}

//mv返回值
export interface ResMvDetailInt {
    code: number;
    data: MvDetailInt;
}

//mv详情
export interface MvDetailInt {
    code: number;
    expi: number;
    fee: number;
    id: number;
    md5: string;
    msg: string;
    mvFee: number;
    r: number;
    size: number;
    st: number;
    url: string;
}

//mvInfo信息
export interface MvInfoInt {
    artistId: number;
    artistName: string;
    artists: Array<ArtistList>;
    briefDesc: string;
    brs: Array<object>;
    commentCount: number;
    commentThreadId: string;
    cover: string;
    coverId: number;
    coverId_str: string;
    desc: string;
    duration: number;
    id: string | number;
    nType: number;
    name: string;
    playCount: number;
    price: number;
    publishTime: string;
    shareCount: number;
    subCount: number;
    videoGroup: Array<videoLabel>;
}

//视频标签
export interface videoLabel {
    id: number;
    name: string;
    type: number;
}

//mvInfo信息res
export interface ResMvInfoInt {
    bufferPic: string;
    bufferPicFS: string;
    code: number;
    data: MvInfoInt;
    loadingPic: string;
    loadingPicFS: string;
    mp: object;
    subed: boolean;
}

//mv点赞评论转发信息

export interface ResMvOperatInt {
    code: number;
    commentCount: number;
    liked: boolean;
    likedCount: number;
    shareCount: number;
}

//歌手mv
export interface ArtistMvInt {
    artist: object;
    artistName: string;
    duration: number;
    id: number | string;
    imgurl: string;
    imgurl16v9: string;
    name: string;
    playCount: number;
    publishTime: string;
    status: number;
    subed: boolean;
}

export interface MvListInt extends ArtistMvInt, MvInfoInt {}
