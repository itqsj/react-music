import http from './api_index';
import { ParamsInt } from '@/types/artist';
// 歌手分类列表
export function artistList(params: ParamsInt) {
    return http({
        url: '/api/artist/list',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
