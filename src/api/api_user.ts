import http from './api_index';

interface CollectorInt {
    //收藏者列表
    id?: string;
    limit?: number;
    uid?: string | number | null;
}

// 账号信息
export function userAccount() {
    return http({
        url: '/api/user/account',
        data: {
            timestamp: Date.now(),
        },
    });
}

//收藏者列表
export function subscribers(params: CollectorInt) {
    return http({
        url: '/api/playlist/subscribers',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//用户详情
export function userDetail(params: CollectorInt) {
    return http({
        url: '/api/user/detail',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
