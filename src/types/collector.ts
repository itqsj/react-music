import { ResponseInt } from './common';

export interface SubsResInt extends ResponseInt {
    more: boolean;
    total: number;
    subscribers: SubscribersInt[];
}

export interface SubscribersInt {
    accountStatus?: number;
    authStatus?: number;
    authority?: number;
    avatarDetail?: string;
    avatarImgId?: number;
    avatarImgIdStr?: string;
    avatarImgId_str?: string;
    avatarUrl?: string;
    backgroundImgId?: number;
    backgroundImgIdStr?: string;
    backgroundUrl?: string;
    birthday?: number;
    city?: number;
    defaultAvatar?: boolean;
    description?: string;
    detailDescription?: string;
    djStatus?: number;
    expertTags?: string;
    experts?: string;
    followed?: boolean;
    gender?: number;
    mutual?: boolean;
    nickname?: string;
    province?: number;
    remarkName?: string;
    signature?: '';
    subscribeTime?: number;
    userId?: number;
    userType?: number;
    vipRights?: string;
    vipType?: number;
}
