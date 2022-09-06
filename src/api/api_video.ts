import http from './api_index';

interface ParamsInt {
    id?: string;
    mvid?: string;
}

// 账号信息
export function personalizedMv() {
    return http({
        url: '/api/personalized/mv',
        params: {
            timestamp: Date.now(),
        },
    });
}

//mvurl详情
export function detailMv(data: ParamsInt) {
    return http({
        url: '/api/mv/url',
        params: {
            timestamp: Date.now(),
            ...data,
        },
    });
}

//mv详情
export function infoMv(data: ParamsInt) {
    return http({
        url: '/api/mv/detail',
        params: {
            timestamp: Date.now(),
            ...data,
        },
    });
}

//获取评论点赞数据
export function mvOperatData(data: ParamsInt) {
    return http({
        url: '/api/mv/detail/info',
        params: {
            timestamp: Date.now(),
            ...data,
        },
    });
}
