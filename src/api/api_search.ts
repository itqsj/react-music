import http from './api_index';

// 账号信息
export function searchHot() {
    return http({
        url: '/api/search/hot/detail',
        data: {
            timestamp: Date.now(),
        },
    });
}
