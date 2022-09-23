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
