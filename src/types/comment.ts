export interface CommentInt {
    //评论
    beReplied?: Array<beRepliedInt>;
    commentId?: number;
    commentLocationType?: number;
    content?: string;
    contentResource?: string;
    decoration?: object;
    expressionUrl?: string;
    grade?: string;
    liked?: boolean;
    likedCount?: number;
    needDisplayTime?: boolean;
    parentCommentId?: number;
    pendantData?: string;
    repliedMark?: string;
    richContent?: string;
    showFloorComment?: string;
    status?: number;
    time?: number;
    timeStr?: string;
    user: commentUserInt;
}

export interface beRepliedInt {
    //评论回复
    beRepliedCommentId?: number;
    content?: string;
    expressionUrl?: string;
    richContent?: string;
    status?: number;
    user: commentUserInt;
}

export interface commentUserInt {
    //评论用户
    anonym?: number;
    authStatus?: number;
    avatarDetail?: string;
    avatarUrl?: string;
    commonIdentity?: string;
    expertTags?: string;
    experts?: string;
    followed?: boolean;
    liveInfo?: string;
    locationInfo?: string;
    mutual?: boolean;
    nickname?: string;
    remarkName?: string;
    userId?: number;
    userType?: number;
    vipRights?: string;
    vipType?: number;
}
