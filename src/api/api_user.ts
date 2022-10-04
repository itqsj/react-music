import http from './api_index';

interface CollectorInt {
    //收藏者列表
    id?: string;
    limit?: number;
    uid?: string | number | null;
    qrimg?: boolean;
    key?: string;
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

//二维码生成key
export function qrKey() {
    return http({
        url: '/api/login/qr/key',
        params: {
            timestamp: Date.now(),
        },
    });
}

//二维码生成
export function qrCreate(params: CollectorInt) {
    return http({
        url: '/api/login/qr/create',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//二维码检查状态
export function qrCheck(params: CollectorInt) {
    return http({
        url: '/api/login/qr/check',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
