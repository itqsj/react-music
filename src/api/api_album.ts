import http from './api_index';

interface ParamsInt {
    id?: string;
}

//专辑内容
export function albumDetail(params: ParamsInt) {
    return http({
        url: '/api/album',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//专辑详情
export function album(params: ParamsInt) {
    return http({
        url: '/api/album',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//专辑动态信息
export function albumDynamic(params: ParamsInt) {
    return http({
        url: '/api/album/detail/dynamic',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
