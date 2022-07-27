import { ParamsIdInt } from '@/types/personalRecom';
import http from './api_index';

// 账号信息
export function getPersonalized() {
    return http({
        url: '/api/personalized',
        data: {
            timestamp: Date.now(),
            limit: 25,
        },
    });
}

//歌单详情
export function playListDetail(params: ParamsIdInt) {
    return http({
        url: '/api/playlist/detail',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌单详情
export function songUrl(params: ParamsIdInt) {
    return http({
        url: '/api/song/url',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
