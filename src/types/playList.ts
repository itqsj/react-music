export interface ResPersonalInt {
    code: number;
    result: PersonRecomInt[];
}

export interface PersonRecomInt {
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

export interface PlayListDetailInt {
    code?: number;
    playlist?: PlayListItemInt;
    privileges?: Array<object>;
    relatedVideos?: string | null;
    resEntrance?: string | null;
    sharedPrivilege?: string | null;
    urls?: string | null;
}

export interface PlayListItemInt {
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
    url?: string;
    mv?: number;
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

export interface ResTopPlayListInt {
    cat: string;
    code: number;
    more: boolean;
    playlists: PlayListInt[];
    total: number;
}

export interface HighqualityPlstInt {
    //精品歌单
    code: number;
    lasttime: number;
    more: boolean;
    playlists: PlayListInt[];
    total: number;
}

export interface PlayListInt {
    //精品歌单的playlists
    adType: number;
    anonimous: boolean;
    cloudTrackCount: number;
    commentCount: number;
    commentThreadId: string;
    copywriter: string;
    coverImgId: number;
    coverImgId_str: string;
    coverImgUrl: string;
    coverStatus: number;
    createTime: number;
    creator: PlayCreatorInt;
    description: string;
    highQuality: boolean;
    id: number;
    name: string;
    newImported: boolean;
    ordered: boolean;
    playCount: number;
    privacy: number;
    shareCount: number;
    specialType: number;
    status: number;
    subscribedCount: number;
    subscribers: Array<PlaySubscriberInt>;
    tag: string;
    tags: Array<string>;
    totalDuration: number;
    trackCount: number;
    trackNumberUpdateTime: number;
    trackUpdateTime: number;
    updateTime: number;
    userId: number;
}
export interface PlayAvatarInt {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}
export interface PlayCreatorInt {
    //精品歌单的creator
    accountStatus: number;
    anchor: boolean;
    authStatus: number;
    authenticationTypes: number;
    authority: number;
    avatarDetail: PlayAvatarInt;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    expertTags: Array<string>;
    followed: boolean;
    gender: number;
    mutual: boolean;
    nickname: string;
    province: number;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}

export interface PlaySubscriberInt {
    //精品歌单的Subscriber
    accountStatus: number;
    anchor: boolean;
    authStatus: number;
    authenticationTypes: number;
    authority: number;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    followed: boolean;
    gender: number;
    mutual: boolean;
    nickname: string;
    province: number;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}

//歌单标签返回值
export interface ResPlayListLabelInt {
    code: number;
    tags: PlayListLabelInt[];
}

//歌单标签
export interface PlayListLabelInt {
    activity: boolean;
    category: number;
    createTime: number;
    hot: boolean;
    id: number;
    name: string;
    playlistTag: object;
    position: number;
    type: number;
    usedCount: number;
}

//歌单分类
export interface PlayListCatListInt {
    all: PlayListCatItemInt;
    categories: Array<string>;
    code: number;
    sub: Array<PlayListCatItemInt>;
}

//歌单分类
export interface PlayListCatItemInt {
    activity: boolean;
    category: number;
    hot: boolean;
    imgId: number;
    imgUrl: string;
    name: string;
    resourceCount: number;
    resourceType: number;
    type: number;
}
