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
    id?: string;
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

//歌手详情返回
export interface ResArtistDetailInt {
    code: number;
    data: ArtistDetailInt;
    message: string;
}

//歌手详情item
export interface ArtistDetailInt {
    artist: ArtistInfoInt;
    blacklist: boolean;
    eventCount: number;
    identify: object;
    preferShow: number;
    secondaryExpertIdentiy: Array<string>;
    showPriMsg: boolean;
    user: object;
    videoCount: number;
    vipRights: object;
}

//歌手信息
export interface ArtistInfoInt {
    albumSize: number;
    briefDesc: string;
    cover: string;
    id: number;
    identifyTag: string[];
    identities: string[];
    musicSize: number;
    mvSize: number;
    name: string;
    rank: string;
    transNames: string[];
}

//歌手专辑返回值
export interface ResArtistAlbumsInt {
    artist: object;
    code: number;
    hotAlbums: Array<ArtistAlbumsInt>;
    more: boolean;
}

//歌手专辑
export interface ArtistAlbumsInt {
    alias: Array<string>;
    artist: ArtistInt;
    artists: Array<ArtistInt>;
    awardTags: Array<string>;
    blurPicUrl: string;
    briefDesc: string;
    commentThreadId: string;
    company: string;
    companyId: number;
    copyrightId: number;
    description: string;
    id: number | string;
    mark: number;
    name: string;
    onSale: boolean;
    paid: boolean;
    pic: number;
    picId: number;
    picId_str: string;
    picUrl: string;
    publishTime: number;
    size: number;
    songs: Array<string>;
    status: number;
    subType: string;
    tags: Array<string>;
    type: string;
}

export interface ArtistInt {
    albumSize: number;
    alias: string[];
    briefDesc: string;
    followed: boolean;
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

//歌手mv
export interface ArtistMvInt {
    artist: object;
    artistName: string;
    duration: number;
    id: number;
    imgurl: string;
    imgurl16v9: string;
    name: string;
    playCount: number;
    publishTime: string;
    status: number;
    subed: boolean;
}

//歌手简介
export interface ResArtistDescInt {
    briefDesc: string;
    code: number;
    count: number;
    introduction: Array<IntroductionInt>;
    topicData: Array<object>;
}

export interface IntroductionInt {
    ti: string;
    txt: string;
}
