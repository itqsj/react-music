export interface HighqualityInt {
    //精品歌单
    code: number;
    lasttime: number;
    more: boolean;
    playlists: PlaylistsInt[];
    total: number;
}

export interface PlaylistsInt {
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
