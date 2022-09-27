import http from './api_index';
import { ParamsInt } from '@/types/playList';

// 歌手分类列表
export function topSongs(params: ParamsInt) {
    return http({
        url: '/api/top/song',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
