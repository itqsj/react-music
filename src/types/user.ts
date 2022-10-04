import { PlayListInt } from './playList';

//用户详情
export interface ResUserDetailInt {
    adValid: boolean;
    bindings: Array<object>;
    code: number;
    createDays: number;
    createTime: number;
    level: number;
    listenSongs: number;
    mobileSign: boolean;
    newUser: boolean;
    pcSign: boolean;
    peopleCanSeeMyPlayRecord: boolean;
    profile: ProfileInt;
    recallUser: boolean;
    userPoint: object;
}

//用户信息
export interface ProfileInt {
    accountStatus: number;
    allSubscribedCount: number;
    artistIdentity: Array<object>;
    authStatus: number;
    authority: number;
    avatarDetail: string;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    blacklist: false;
    cCount: number;
    city: number;
    createTime: number;
    defaultAvatar: false;
    description: string;
    detailDescription: string;
    djStatus: number;
    eventCount: number;
    expertTags: string;
    experts: object;
    followMe: false;
    followTime: string;
    followed: false;
    followeds: number;
    follows: number;
    gender: number;
    inBlacklist: false;
    mutual: false;
    newFollows: number;
    nickname: string;
    playlistBeSubscribedCount: number;
    playlistCount: number;
    privacyItemUnlimit: object;
    province: number;
    remarkName: string;
    sCount: number;
    sDJPCount: number;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}

//用户歌单返回值
export interface ResUserPlaylistInt {
    code: number;
    more: boolean;
    playlist: Array<PlayListInt>;
    version: string;
}

//用户登录二维码key返回值
export interface ResQrKeyInt {
    code: number;
    data: QrKeyInt;
}

export interface QrKeyInt {
    code: number;
    unikey: string;
}

//用户登录二维码返回值
export interface ResQrCreateInt {
    code: number;
    data: QrCreateInt;
}

export interface QrCreateInt {
    qrimg: string;
    qrurl: string;
}

//二维码检查状态
export interface ResQrStatusInt {
    code: number;
    cookie: string;
    message: string;
}

//用户信息
export interface ResUserInfoInt {
    account: object;
    code: number;
    profile: UserInfoInt;
}

export interface UserInfoInt {
    accountStatus: number;
    accountType: number;
    anchor: boolean;
    authStatus: number;
    authenticated: boolean;
    authenticationTypes: number;
    authority: number;
    avatarDetail: number;
    avatarImgId: number;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundUrl: string;
    birthday: number;
    city: number;
    createTime: number;
    defaultAvatar: boolean;
    description: boolean;
    detailDescription: boolean;
    djStatus: number;
    expertTags: boolean;
    experts: boolean;
    followed: boolean;
    gender: number;
    lastLoginIP: string;
    lastLoginTime: number;
    locationStatus: number;
    mutual: boolean;
    nickname: string;
    province: number;
    remarkName: boolean;
    shortUserName: string;
    signature: boolean;
    userId: number;
    userName: string;
    userType: number;
    vipType: number;
    viptypeVersion: number;
}
